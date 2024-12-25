import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { deleteCookie, setCookie } from "hono/cookie";
import { createSupabaseServerClient } from "@/libs/supabase/server";

const authRoutes = new Hono()
    .get(
        "/sign-in-with-provider",
        async (c) => {
            const code = c.req.query("code")
            const next = c.req.query("next")
            if (code) {
                const supabase = createSupabaseServerClient(c)
                const { data, error } = await supabase.auth.exchangeCodeForSession(code)
                if (error) {
                    console.error("Error while signing in with Provider ", error);
                    throw new HTTPException(401, { message: error.message });
                }

                setCookie(c, "access_token", data.session.access_token);
                setCookie(c, "refresh_token", data.session.refresh_token);
                setCookie(c, "user_data", JSON.stringify(data.user))

                return c.redirect("/private");
            }
            return c.redirect("/")
        },
    )
    .post(
        "/sign-out", async (c) => {
            const supabase = createSupabaseServerClient(c)
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
            deleteCookie(c, "user_data")
        },
    )

export default authRoutes;
