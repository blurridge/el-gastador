import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { createResponse } from "@/utils/createResponse";
import { RESPONSE_STATUS } from "@/utils/constants";
import authMiddleware from "../middleware/authMiddleware";
import { zValidator } from '@hono/zod-validator'
import { GetProfileSchema, PartialUpdateUserProfileSchema } from "@/types/schema";
import { db } from "@/db";
import { userProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";

const profileRoutes = new Hono()
    .use("*", authMiddleware)
    .get("get-user-profile", zValidator('query', GetProfileSchema, (result, c) => {
        if (!result.success) {
            throw new HTTPException(401, { message: result.error.toString() });
        }
    }),
        async (c) => {
            const { id: userId } = c.req.valid('query')
            try {
                const profileData = await db.select().from(userProfiles).where(eq(userProfiles.id, userId))
                if (!profileData || !profileData.length) {
                    return c.json(createResponse({ status: RESPONSE_STATUS.FAIL, message: "No user profile available.", data: null }))
                }
                return c.json(createResponse({ status: RESPONSE_STATUS.SUCCESS, message: "Fetched user profile successfully!", data: profileData[0] }))
            }
            catch (error) {
                return c.json(createResponse({ status: RESPONSE_STATUS.FAIL, message: (error as Error).message, data: null }))
            }
        })
    .post("update-user-profile", zValidator('json', PartialUpdateUserProfileSchema),
        async (c) => {
            const validatedUserProfilePayload = c.req.valid('json')
            try {
                const updatedUserProfile = await db.insert(userProfiles)
                    .values(validatedUserProfilePayload)
                    .onConflictDoUpdate({
                        target: userProfiles.id,
                        set: {
                            displayName: validatedUserProfilePayload.displayName,
                            updatedAt: new Date()
                        }
                    })
                    .returning();
                return c.json(createResponse({ status: RESPONSE_STATUS.SUCCESS, message: "User profile updated successfully!", data: updatedUserProfile }))
            }
            catch (error) {
                return c.json(createResponse({ status: RESPONSE_STATUS.FAIL, message: (error as Error).message, data: null }))
            }
        }
    )

export default profileRoutes;
