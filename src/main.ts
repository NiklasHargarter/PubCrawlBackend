import { Application } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { User } from "./models/index.ts";
import routes from "./routes/index.ts";

const port = 8000;
const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(async (Context, next) => {
  Context.state = {
    me: { user_id: "suppe", user_name: "niklas" } as User,
  };
  await next();
});

app.use(routes.action.routes());
app.use(routes.action.allowedMethods());

app.use(routes.user.routes());
app.use(routes.user.allowedMethods());
app.use(routes.location.routes());
app.use(routes.location.allowedMethods());
app.addEventListener("listen", () => {
  console.log(`Listening on localhost:${port}`);
});

await app.listen({ port });
