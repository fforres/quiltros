import match from 'micro-route/match';
import next from 'next';
import { parse } from 'url';

import { IncomingMessage, ServerResponse } from 'http';

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const isA = (req: IncomingMessage) => match(req, '/a');
const isB = (req: IncomingMessage) => match(req, '/b');

async function main(req: IncomingMessage, res: ServerResponse) {
  const { url = '' } = req;
  const parsedUrl = parse(url, true);
  const { query } = parsedUrl;

  if (isA(req)) {
    return app.render(req, res, '/b', query);
  } else if (isB(req)) {
    return app.render(req, res, '/a', query);
  }

  return handle(req, res, parsedUrl);
}

async function setup(handler) {
  await app.prepare();
  return handler;
}

module.exports = setup(main);
