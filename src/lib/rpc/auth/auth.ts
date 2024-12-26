import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createResponse } from "@/utils/createResponse";
import { RESPONSE_STATUS } from "@/utils/constants";

const authRoutes = new Hono()
    .get(
        "/sign-in-with-provider",
        async (c) => {
            const code = c.req.query("code")
            const next = c.req.query("next")
            if (code) {
                const supabase = await createSupabaseServerClient()
                const { error } = await supabase.auth.exchangeCodeForSession(code)
                if (error) {
                    console.error("Error while signing in with Provider ", error);
                    throw new HTTPException(401, { message: error.message });
                }
                return c.redirect("/home")
            }
            return c.redirect("/login")
        },
    )
    .get(
        "/sign-out", async (c) => {
            const supabase = await createSupabaseServerClient()
            const { error } = await supabase.auth.signOut()
            if (error) {
                console.error("Error while signing out with Provider ", error);
                throw new HTTPException(401, { message: error.message });
            }
            return c.json(createResponse({ status: RESPONSE_STATUS.SUCCESS, message: "User signed out successfully!" }));
        },
    )
    .get(
        "/get-user", async (c) => {
            const supabase = await createSupabaseServerClient()
            const { data: { user }, error } = await supabase.auth.getUser()
            if (error) {
                console.error("Error getting user", error);
                throw new HTTPException(401, { message: error.message });
            }
            return c.json(createResponse({ status: RESPONSE_STATUS.SUCCESS, message: "User data fetched successfully!", data: user }));
        }
    )

export default authRoutes;
