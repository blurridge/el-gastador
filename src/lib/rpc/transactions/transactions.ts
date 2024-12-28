import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { createResponse } from "@/utils/createResponse";
import { RESPONSE_STATUS } from "@/utils/constants";
import authMiddleware from "../middleware/authMiddleware";
import { zValidator } from '@hono/zod-validator'
import { GetTransactionSchema } from "@/types/schema";
import { db } from "@/db";
import { transactions } from "@/db/schema";
import { eq } from "drizzle-orm";

const transactionRoutes = new Hono()
    .use("*", authMiddleware)
    .get("get-user-transactions", zValidator('query', GetTransactionSchema, (result, c) => {
        if (!result.success) {
            throw new HTTPException(401, { message: result.error.toString() });
        }
    }),
        async (c) => {
            const { id: userId } = c.req.valid('query')
            try {
                const transactionData = await db.select().from(transactions).where(eq(transactions.userId, userId))
                if (!transactionData || !transactionData.length) {
                    return c.json(createResponse({ status: RESPONSE_STATUS.FAIL, message: "No transactions available.", data: null }))
                }
                return c.json(createResponse({ status: RESPONSE_STATUS.SUCCESS, message: "Fetched user transactions successfully!", data: transactionData }))
            }
            catch (error) {
                return c.json(createResponse({ status: RESPONSE_STATUS.FAIL, message: (error as Error).message, data: null }))
            }
        })

export default transactionRoutes;
