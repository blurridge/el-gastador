import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Hono } from "hono";
import { createClient } from "@/libs/supabase/client";
import { HTTPException } from "hono/http-exception";
import { deleteCookie, setCookie } from "hono/cookie";

const authRoutes = new Hono()
    .post(
        "/sign-in-with-provider",
        zValidator(
            "json",
            z.object({
                provider: z.enum(["google"]),
                token: z.string().min(8),
                accessToken: z.string().optional(),
            }),
        ),
        async (c) => {
            const supabase = createClient()
            const { token, provider, accessToken } = c.req.valid("json");
            const { data, error } = await supabase.auth.signInWithIdToken({
                provider,
                token,
                access_token: accessToken,
            });

            if (error) {
                console.error("Error while signing in with Provider ", error);
                throw new HTTPException(401, { message: error.message });
            }

            setCookie(c, "access_token", data?.session.access_token, {
                ...(data?.session.expires_at && { expires: new Date(data.session.expires_at) }),
                httpOnly: true,
                path: "/",
                secure: true,
            });

            setCookie(c, "refresh_token", data?.session.refresh_token, {
                ...(data?.session.expires_at && { expires: new Date(data.session.expires_at) }),
                httpOnly: true,
                path: "/",
                secure: true,
            });

            return c.json(data.user);
        },
    )
    .post(
        "/sign-out", async (c) => {
            const supabase = createClient();
            const { error } = await supabase.auth.signOut()
            if (error) {
                console.error("Error while signing out with Provider ", error);
                throw new HTTPException(401, { message: error.message });
            }

            deleteCookie(c, 'access_token', {
                path: '/',
                secure: true,
            })
            deleteCookie(c, 'refresh_token', {
                path: '/',
                secure: true,
            })
        },
    )

export default authRoutes;
