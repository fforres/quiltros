import glob from 'glob';
import { IncomingMessage, ServerResponse } from 'http';
import { createServer } from 'http';
import { resolve } from 'path';
import pathMatch from 'path-match';

const routeMatcher = pathMatch();
const postMatch = routeMatcher(`/api/:route`);
const port = 3001;

glob('./lambdas/*/index.ts', (err, files) => {
  console.log(`Api ready @ :${port}`);
  const maps = {};
  files.forEach(current => {
    const route = current.split('/')[2];
    maps[route] = resolve(current);
  }, {});
  createServer((req: IncomingMessage, res: ServerResponse) => {
    const { route } = postMatch(req.url);
    if (maps[route]) {
      require(maps[route]).default(req, res);
      // removing the require cache so we don't need to add nodemon
      Object.keys(require.cache).forEach(cacheKey => {
        if (cacheKey.includes('lambdas')) {
          delete require.cache[cacheKey];
        }
      });
    }
  }).listen(port);
});
