# Sneak peak at SSR with Angular v19

<p align="center">
  <img src="public/angular_wordmark_gradient.png" alt="angular-logo" height="120px"/>
    <br>
  <em>Server-Side Rendering with Angular v19</em>
  <br>
</p>

- Check [`server.ts`](/server.ts) with the `AngularNodeAppEngine` replacing the `CommonEngine`
- [`server.ts`](/server.ts) is now used by the vite dev-server if using `outoutputMode: 'server` in [`angular.json`](/angular.json)
- Server routes are defined in [app.routes.server.ts](/src/app/app.routes.server.ts)
- Server side token are accessible (like REQUEST, REQUEST_CONTEXT etc.)

> [!WARNING]  
> This is pretty much a WIP and this demo is not feature complete.

> [!NOTE]
> This project is based on dev builds (!= pre-releases).

## Run the demo

1. install the deps with `yarn`
2. run with `yarn start`
