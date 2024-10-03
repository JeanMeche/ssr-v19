import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { Hono } from 'hono';
import { getConnInfo } from 'hono/cloudflare-workers';

export function app() {
  const server = new Hono();
  const angularAppEngine = new AngularAppEngine();

  server.get('/*', async (c) => {
    const res = await angularAppEngine.render(c.req.raw, { server: 'hono' });
    return res || undefined;
  });

  console.warn('Hono server started');

  return server;
}

const server = app();
export default createRequestHandler(server.fetch);
