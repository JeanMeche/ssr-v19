import { Component, inject, makeStateKey, REQUEST, REQUEST_CONTEXT, TransferState, VERSION } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header>Angular {{ version }} - Served by {{server}}</header>

    <h2>Try navigating to:</h2>
    <p>
      <a href="/error">This server error page (Server returns a 404, app shows the dedicated routed component)</a>
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
  server: string | undefined;
  transferState = inject(TransferState);
  serverKey = makeStateKey<string>('server');

  constructor() {
    const request = inject(REQUEST, { optional: true });
    console.log(request);
    if (request) {
      console.log('Server received a request', request.url);
    }

    const reqContext = inject(REQUEST_CONTEXT, { optional: true }) as {
      server: string;
    };
    if (reqContext) {
      // The context is defined in the server*.ts file
      this.server = reqContext.server;

      // Store this as this won't be available on hydration
      this.transferState.set(this.serverKey, this.server);
    }
    this.server = this.transferState.get(this.serverKey, '');
  }
}
