import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'home', renderMode: RenderMode.Client },
  { path: 'redirect', renderMode: RenderMode.Server, status: 301 },
  {
    path: 'error',
    renderMode: RenderMode.Server,
    status: 404,
    headers: {
      'Cache-Control': 'no-cache',
    },
    
  },
  { path: '**', renderMode: RenderMode.Server },
];
