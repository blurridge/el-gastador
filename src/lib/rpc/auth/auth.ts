import { Hono } from 'hono';
import { deleteCookie, setCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';

import { createSupabaseServerClient } from '@/lib/supabase/server';

import { RESPONSE_STATUS } from '@/utils/constants';
import { createResponse } from '@/utils/createResponse';
import { generateUrl } from '@/utils/generateUrl';

const authRoutes = new Hono()
    .get('/sign-in-with-provider', async (c) => {
        const supabase = await createSupabaseServerClient();
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: generateUrl('/api/auth/auth-callback'),
            },
        });
        if (data.url) {
            return c.json(createResponse({ status: RESPONSE_STATUS.SUCCESS, message: 'Provider data url returned!', data: data.url }));
        }
        return c.json(createResponse({ status: RESPONSE_STATUS.FAIL, message: 'Provider data url not returned!' }));
    })
    .get('/auth-callback', async (c) => {
        const code = c.req.query('code');
        if (code) {
            const supabase = await createSupabaseServerClient();
            const { data, error } = await supabase.auth.exchangeCodeForSession(code);
            if (error) {
                console.error('Error while signing in with Provider', error);
                throw new HTTPException(401, { message: error.message });
            }
            setCookie(c, 'access_token', data?.session.access_token, {
                ...(data?.session.expires_at && { expires: new Date(data.session.expires_at) }),
                httpOnly: true,
                path: '/',
                secure: true,
            });

            setCookie(c, 'refresh_token', data?.session.refresh_token, {
                ...(data?.session.expires_at && { expires: new Date(data.session.expires_at) }),
                httpOnly: true,
                path: '/',
                secure: true,
            });
            return c.redirect('/home');
        }
        return c.redirect('/login');
    })
    .get('/sign-out', async (c) => {
        const supabase = await createSupabaseServerClient();
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error while signing out', error);
            throw new HTTPException(401, { message: error.message });
        }
        deleteCookie(c, 'access_token');
        deleteCookie(c, 'refresh_token');
        return c.json(createResponse({ status: RESPONSE_STATUS.SUCCESS, message: 'User signed out successfully!' }));
    })
    .get('/get-user', async (c) => {
        const supabase = await createSupabaseServerClient();
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();
        if (error) {
            console.error('Error getting user', error);
            throw new HTTPException(401, { message: error.message });
        }
        return c.json(createResponse({ status: RESPONSE_STATUS.SUCCESS, message: 'User data fetched successfully!', data: user }));
    });

export default authRoutes;
