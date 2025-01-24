import authMiddleware from '../middleware/authMiddleware';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

import { GetTransactionSchema, PartialTransactionSchema } from '@/types/schema';

import { db } from '@/db';
import { transactions } from '@/db/schema';
import { RESPONSE_STATUS } from '@/utils/constants';
import { createResponse } from '@/utils/createResponse';

const transactionRoutes = new Hono()
  .use('*', authMiddleware)
  .get(
    'get-user-transactions',
    zValidator('query', GetTransactionSchema, (result, c) => {
      if (!result.success) {
        throw new HTTPException(401, { message: result.error.toString() });
      }
    }),
    async (c) => {
      const { id: userId } = c.req.valid('query');
      try {
        const transactionData = await db.query.transactions.findMany({
          where: eq(transactions.userId, userId),
          with: {
            category: true,
          },
        });
        if (!transactionData || !transactionData.length) {
          return c.json(createResponse({ status: RESPONSE_STATUS.FAIL, message: 'No transactions available.', data: [] }));
        }
        return c.json(
          createResponse({
            status: RESPONSE_STATUS.SUCCESS,
            message: 'Fetched user transactions successfully!',
            data: transactionData,
          }),
        );
      } catch (error) {
        return c.json(createResponse({ status: RESPONSE_STATUS.FAIL, message: (error as Error).message, data: null }));
      }
    },
  )
  .post('create-user-transaction', zValidator('json', PartialTransactionSchema), async (c) => {
    const validatedUserTransactionPayload = c.req.valid('json');
    try {
      const newUserTransaction = await db
        .insert(transactions)
        .values(validatedUserTransactionPayload)
        .onConflictDoUpdate({
          target: transactions.id,
          set: {
            amount: validatedUserTransactionPayload.amount,
            description: validatedUserTransactionPayload.description,
            categoryId: validatedUserTransactionPayload.categoryId,
            updatedAt: new Date(),
          },
        })
        .returning();
      return c.json(
        createResponse({
          status: RESPONSE_STATUS.SUCCESS,
          message: `Transaction worth PHP ${parseFloat(validatedUserTransactionPayload.amount).toFixed(2)} added successfully!`,
          data: newUserTransaction,
        }),
      );
    } catch (error) {
      return c.json(createResponse({ status: RESPONSE_STATUS.FAIL, message: (error as Error).message, data: null }));
    }
  });

export default transactionRoutes;
