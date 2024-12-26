import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { deleteCookie, setCookie } from "hono/cookie";
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
                const { data, error } = await supabase.auth.exchangeCodeForSession(code)
                if (error) {
                    console.error("Error while signing in with Provider ", error);
                    throw new HTTPException(401, { message: error.message });
                }
                setCookie(c, "user_data", JSON.stringify(data.user))
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
            deleteCookie(c, "user_data")
            return c.json(createResponse({ status: RESPONSE_STATUS.SUCCESS, message: "User signed out successfully!" }));
        },
    )

export default authRoutes;
