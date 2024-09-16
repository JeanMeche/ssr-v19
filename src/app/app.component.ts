import { isPlatformServer } from '@angular/common';
import { Component, inject, PLATFORM_ID, VERSION } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { REQUEST, REQUEST_CONTEXT } from '@angular/ssr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header>Angular {{ version }}</header>
    AppComponent !

    <h2>Try navigating to:</h2>
    <p>
      <a href="/error">This server error page (a 404 served by the server)</a>
    </p>
    <p>
      <a href="/redirect"
        >This server redirect page (a 301 served by the server)</a
      >
    </p>
    <p><a href="/home">This client only page (no SSR, pure CSR) </a></p>
    <p><a href="/">The home page, SSR'd</a></p>

    <br />

    <p>Those routes are defined in <code>src/app/app.routes.server.ts</code></p>
    <p>
      After ServerRoutes, the regular router takes over
      <code>src/app/app.routes.ts</code>
    </p>

    <fieldset>
      <router-outlet />
    </fieldset>
  `,
})
export class AppComponent {
  version = VERSION.full;

  constructor() {
    const request = inject(REQUEST, { optional: true });
    if(request) {
      console.log('Server received a request', request.url);
    }
  }
}
