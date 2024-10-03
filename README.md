# Sneak peak at SSR with Angular v19

<p align="center">
  <img src="public/angular_wordmark_gradient.png" alt="angular-logo" height="120px"/>
    <br>
  <em>Server-Side Rendering with Angular v19</em>
  <br>
</p>

- Check [`server-express.ts`](/server.ts) with the `AppEngine` replacing the `CommonEngine`
- [`server.ts`](/server.ts) is now used by the vite dev-server if using `outoutputMode: 'server` in [`angular.json`](/angular.json)
- Server routes are defined in [app.routes.server.ts](/src/app/app.routes.server.ts)
- Server side token are accessible (like REQUEST, REQUEST_CONTEXT etc.)

> [!WARNING]  
> This is pretty much a WIP and this demo is not feature complete.

> [!NOTE]
> This project is based a pre-release of v19 which is under active development

## AppEngine 

The `AppEngine` enables running non-node dependent servers ! 

This demo includes example with `h3`, `hono` and `fastify` (in addition to express)

* `ng serve --configuration=fastify` ([server file](./server-fastify.ts))
* `ng serve --configuration=hono`  ([server file](./server-hono.ts))
* `ng serve --configuration=h3`  ([server file](./server-h3.ts))

By default the demo will use `express`. 

## Run the demo

1. install the deps with `yarn`
2. run with `ng serve` or `yarn start`
