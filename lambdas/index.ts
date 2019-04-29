import glob from 'glob';
import { IncomingMessage, ServerResponse } from 'http';
import { resolve } from 'path';
import pathMatch from 'path-match';

const routeMatcher = pathMatch();
const postMatch = routeMatcher(`/api/:route`);

export const lambdaHandler = (req: IncomingMessage, res: ServerResponse) => {
  glob('./lambdas/*/index.ts', (err, files) => {
    const maps = {};
    files.forEach(current => {
      const routeKey = current.split('/')[2];
      maps[routeKey] = resolve(current);
    }, {});
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
  });
};
