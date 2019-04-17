import fastifyCreator from 'fastify';
import fastifyNextJS from 'fastify-nextjs';

const fastify = fastifyCreator();

fastify.register(fastifyNextJS).after(() => {
  fastify.next('/hello', (app, req, reply) => {
    return app.render(req.raw, reply.res, '/hello', req.query, {});
  });
  fastify.next('/create', (app, req, reply) => {
    return app.render(req.raw, reply.res, '/', req.query, {});
  });
  fastify.next('/', (app, req, reply) => {
    return app.render(req.raw, reply.res, '/', req.query, {});
  });
});

fastify.listen(3000, err => {
  if (err) {
    throw err;
  }
  console.info('Server listenging on http://localhost:3000');
});
