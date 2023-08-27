import { helpers, Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { addUser, getUsers } from "../controller.ts";

const router = new Router();

router.get("/users", (ctx) => {
  ctx.response.body = getUsers();
});

router.get("/users/:id", (ctx) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  ctx.response.body = "not implemented";
});

router.post("/users", async (ctx) => {
  const { username } = await ctx.request.body({ type: "json" }).value;
  ctx.response.body = addUser(username);
});

export default router;
