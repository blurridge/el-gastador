import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { handle } from 'hono/vercel';

import { authRoutes, categoryRoutes, profileRoutes, transactionRoutes } from '@/lib/rpc';

const app = new Hono().basePath('/api').use('*', logger()).use('*', cors());

const routes = app
  .route('/auth', authRoutes)
  .route('/profile', profileRoutes)
  .route('/transactions', transactionRoutes)
  .route('/categories', categoryRoutes);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
