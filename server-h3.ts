import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import {
  createApp,
  createRouter,
  toWebHandler,
  defineEventHandler,
  toWebRequest,
} from 'h3';

export function app() {
  const server = createApp();
  const router = createRouter();
  const angularAppEngine = new AngularAppEngine();

  router.use(
    '/**',
    defineEventHandler((event) =>
      angularAppEngine.render(toWebRequest(event), { server: 'h3' })
    )
  );

  server.use(router);

  console.warn('H3 server started');

  return server;
}

const server = app();
const handler = toWebHandler(server);
export default createRequestHandler(handler);
