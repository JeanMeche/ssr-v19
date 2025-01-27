import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { isMainModule } from '@angular/ssr/node';
import {
  createApp,
  createRouter,
  defineEventHandler,
  toWebHandler,
  toWebRequest,
  toNodeListener,
} from 'h3';
import { createServer } from 'node:http';

export function app() {
  const server = createApp();
  const router = createRouter();
  const angularAppEngine = new AngularAppEngine();

  router.use(
    '/**',
    defineEventHandler((event) =>
      angularAppEngine.handle(toWebRequest(event), { server: 'h3' })
    )
  );

  server.use(router);

  console.warn('H3 server started');

  return server;
}

const server = app();
const webHandler = toWebHandler(server);

if (isMainModule(import.meta.url)) {
  // Doesn't work correctly in prod
  const port = process.env['PORT'] || 4000;
  createServer(toNodeListener(server)).listen(port);
}

export const reqHandler = createRequestHandler(webHandler);
