import { Router } from "https://deno.land/x/oak@v12.6.0/mod.ts";
import { addAction } from "../controller.ts";

const router = new Router();

router.post("/actions", async (ctx) => {
    const action = await ctx.request.body({ type: "json" }).value;
    console.log(action)
    ctx.response.body = addAction(action);
});

export default router;