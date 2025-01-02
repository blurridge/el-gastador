import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { createResponse } from '@/utils/createResponse';
import { RESPONSE_STATUS } from '@/utils/constants';
import authMiddleware from '../middleware/authMiddleware';
import { zValidator } from '@hono/zod-validator';
import { GetCategorySchema } from '@/types/schema';
import { db } from '@/db';
import { categories } from '@/db/schema';
import { eq, or } from 'drizzle-orm';

const categoryRoutes = new Hono().use('*', authMiddleware).get(
    'get-user-categories',
    zValidator('query', GetCategorySchema, (result, c) => {
        if (!result.success) {
            throw new HTTPException(401, { message: result.error.toString() });
        }
    }),
    async (c) => {
        const { id: userId } = c.req.valid('query');
        try {
            const categoryData = await db
                .select()
                .from(categories)
                .where(or(eq(categories.userId, userId), eq(categories.default, true)));
            if (!categoryData || !categoryData.length) {
                return c.json(createResponse({ status: RESPONSE_STATUS.FAIL, message: 'No categories available.', data: [] }));
            }
            return c.json(
                createResponse({ status: RESPONSE_STATUS.SUCCESS, message: 'Fetched user categories successfully!', data: categoryData }),
            );
        } catch (error) {
            return c.json(createResponse({ status: RESPONSE_STATUS.FAIL, message: (error as Error).message, data: null }));
        }
    },
);

export default categoryRoutes;
