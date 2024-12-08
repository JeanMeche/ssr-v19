import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { isMainModule } from '@angular/ssr/node';
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
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;

  server.listen(port, () => {
    console.log(`Elysia server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createRequestHandler(server.fetch);
