import {Router} from "https://deno.land/x/oak@v12.6.0/mod.ts";
import {addLocation, getLocation, getLocations} from "../controller.ts";
import {Location} from "../models/index.ts";

const router = new Router();

router.post("/locations", async (ctx) => {
    const location: Location = await ctx.request.body({
        type: "json",
    }).value;
    ctx.response.body = addLocation(location);
});

router.get("/locations/:id", (ctx) => {
    const id = ctx.params.id;
    ctx.response.body = getLocation(id);
});

router.get("/locations", (ctx) => {
    ctx.response.body = getLocations();
})

export default router;
