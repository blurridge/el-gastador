import { createServerClient } from "@supabase/ssr";
import type { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";

export function createClient(c: Context) {
  return createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () =>
        Object.entries(getCookie(c)).map(([name, value]) => ({ name, value })),

      setAll: (cookies) => {
        cookies.forEach(({ name, value, options }) => {
          setCookie(c, name, value, {
            ...options,
            sameSite:
              options.sameSite === true
                ? "strict"
                : options.sameSite || undefined,
          });
        });
      },
    },
  });
}
