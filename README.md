# SSR with Angular AppEngine in v19

<p align="center">
  <img src="public/angular_wordmark_gradient.png" alt="angular-logo" height="120px"/>
    <br>
  <em>Server-Side Rendering with Angular v19</em>
  <br>
</p>

- Check [`server-express.ts`](/server.ts) with the `AppEngine` replacing the `CommonEngine`
- [`server.ts`](/server.ts) is now used by the vite dev-server if using `outoutputMode: 'server` in [`angular.json`](/angular.json)
- Server routes are defined in [app.routes.server.ts](/src/app/app.routes.server.ts)
- Server side token are accessible (like `REQUEST`, `REQUEST_CONTEXT` etc.)

> [!Note]  
> This is a small demo and does not exhibit every features.


## AppEngine 

The `AppEngine` enables running non-node dependent servers ! 

This demo includes example with `h3`, `elysia`, `hono` and `fastify` (in addition to `express`)

* `ng serve --configuration=fastify` ([server file](./server-fastify.ts))
* `ng serve --configuration=hono`  ([server file](./server-hono.ts))
* `ng serve --configuration=h3`  ([server file](./server-h3.ts))
* `ng serve --configuration=elysia`  ([server file](./server-elysia.ts))

By default the demo will use `express`. 

## Run the demo

1. install the deps with `yarn`
2. run with `ng serve` or `yarn start`

Note:
Elysia requires to run the app with [Bun](https://bun.sh/). You can do a prod build with `ng b -c elysia` and and run `bun server.mjs` from the `dist/ssr-new/server` director. 
