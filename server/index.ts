// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
import { createServer, IncomingMessage, ServerResponse } from 'http';
import next from 'next';
import { parse } from 'url';
import { lambdaHandler } from '../lambdas';

import pathMatch from 'path-match';
const routeMatcher = pathMatch();
const apiRouteMatch = routeMatcher(`/api/*`);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req: IncomingMessage, res: ServerResponse) => {
    // Add our lambda handlers to be able to code with them in dev mode
    if (dev) {
      if (apiRouteMatch(req.url)) {
        return lambdaHandler(req, res);
      }
    }
    if (req.url) {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }
  }).listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});
