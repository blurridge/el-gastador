import { Hono } from "hono";

const authRoutes = new Hono()
    .get("/", (c) => c.json("list users"))
    .post("/", (c) => c.json("create a user", 201))
    .get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

export default authRoutes;
