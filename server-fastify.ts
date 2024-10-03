import {
  AngularNodeAppEngine,
  writeResponseToNodeResponse,
  isMainModule,
  createNodeRequestHandler,
} from '@angular/ssr/node';
import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

export function app() {
  const server = fastify();
  const angularNodeAppEngine = new AngularNodeAppEngine();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  server.register(fastifyStatic, { root: browserDistFolder, wildcard: false });
  server.get('*', async (req, reply) => {
    try {
      const response = await angularNodeAppEngine.render(req.raw, {
        server: 'fastify',
      });
      if (response) {
        await writeResponseToNodeResponse(response, reply.raw);
      } else {
        reply.callNotFound();
      }
    } catch (error) {
      reply.send(error);
    }
  });

  // With this config, /404 will not reach the Angular app
  server.setNotFoundHandler((req, reply) => {
    reply.send('This is a server only error');
  });

  return server;
}

const server = app();
if (isMainModule(import.meta.url)) {
  const port = +(process.env['PORT'] || 4000);
  server.listen({ port }, () => {
    console.warn(`Fastify server listening on http://localhost:${port}`);
  });
}

console.warn('Fastify server started');

export default createNodeRequestHandler(async (req, res) => {
  await server.ready();
  server.server.emit('request', req, res);
});
