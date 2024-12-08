import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { Elysia } from 'elysia'

export function app() {
  const server = new Elysia();
  const angularAppEngine = new AngularAppEngine();

  server.get('/*', async (c) => {
    const res = await angularAppEngine.handle(c.request, { server: 'elysia' });
    return res || undefined;
  });

  console.warn('Elysia server started');

  return server;
}

const server = app();
export const reqHandler = createRequestHandler(server.fetch);
