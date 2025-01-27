import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { isMainModule } from '@angular/ssr/node';
import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { serve } from '@hono/node-server';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function createApp() {
  const server = new Hono();
  const angularAppEngine = new AngularAppEngine();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');

  server.all(
    '/*',
    serveStatic({
      root: browserDistFolder,
      onNotFound(path, c) {
        // We have an issue with the static plugin, files are not found
        console.log('not found -', path);
      },
    })
  );

  server.get('/*', async (c) => {
    const res = await angularAppEngine.handle(c.req.raw, { server: 'hono' });
    if (!res) {
      // gracefuly fail with a 404 (probably because static failed)
      return c.text('Not found ---', { status: 404 });
    }
    return res;
  });

  console.warn('Hono server started');
  return server;
}

const app = createApp();

if (isMainModule(import.meta.url)) {
  // Doesn't work correctly in prod
  const port = Number(process.env['PORT']) || 4000;
  const a = serve(
    {
      fetch: app.fetch,
      port: port,
    },
    (info) => {
      console.log(`Hono server listening on http://localhost:${info.port}`);
    }
  );
}

export const reqHandler = createRequestHandler(app.fetch);
