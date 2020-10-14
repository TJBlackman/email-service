import { Application, send } from "https://deno.land/x/oak/mod.ts";
import userController from './controllers/users.controller.ts';
import organizationsController from './controllers/organizations.controller.ts';

const app = new Application();

app.use(userController.routes());
app.use(organizationsController.routes());

// static content
app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/public`,
    index: "index.html",
  });
});

console.log('Listening on port 8000')
await app.listen({ port: 8000 });