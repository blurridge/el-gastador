import { Hono } from "hono";
import { handle } from "hono/vercel";
import { authRoutes } from "@/libs/rpc"
import { cors } from "hono/cors";
import { logger } from "hono/logger";

export const runtime = "edge";

const app = new Hono()
    .basePath("/api")
    .use("*", logger())
    .use("*", cors());

const routes = app.route("/auth", authRoutes);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
