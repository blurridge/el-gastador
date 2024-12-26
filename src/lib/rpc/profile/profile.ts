import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { createResponse } from "@/utils/createResponse";
import { RESPONSE_STATUS } from "@/utils/constants";
import authMiddleware from "../middleware/authMiddleware";
import { zValidator } from '@hono/zod-validator'
import { GetProfileSchema } from "@/types/schema";
import { db } from "@/db";
import { userProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";

const profileRoutes = new Hono()
    .use("*", authMiddleware)
    .get("get-user-profile", zValidator('json', GetProfileSchema, (result, c) => {
        if (!result.success) {
            throw new HTTPException(401, { message: result.error.toString() });
        }
    }),
        async (c) => {
            const { id: userId } = c.req.valid('json')
            const profileData = await db.select().from(userProfiles).where(eq(userProfiles.id, userId))
            if (!profileData) {
                return c.json(createResponse({ status: RESPONSE_STATUS.FAIL, message: "No user profile available.", data: null }))
            }
            return c.json(createResponse({ status: RESPONSE_STATUS.SUCCESS, message: "Fetched user profile successfully!", data: profileData }))
        })
    .post("update-user-profile")
export default profileRoutes;
