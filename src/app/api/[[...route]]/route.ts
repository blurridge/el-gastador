import { Hono } from "hono";
import { handle } from "hono/vercel";
import { authRoutes, profileRoutes, transactionRoutes } from "@/lib/rpc"
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono()
    .basePath("/api")
    .use("*", logger())
    .use("*", cors());

const routes = app
    .route("/auth", authRoutes)
    .route("/profile", profileRoutes)
    .route("/transactions", transactionRoutes)

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
