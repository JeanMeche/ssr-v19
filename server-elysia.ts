import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { isMainModule } from '@angular/ssr/node';
import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function app() {
  const server = new Elysia();
  const angularAppEngine = new AngularAppEngine();

  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');

  server.use(staticPlugin({
    prefix: '',
    assets: browserDistFolder,
    alwaysStatic: true,
  }));

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
