'use client'
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

const SignIn = () => {
    const handleLogin = async () => {
        const supabase = createSupabaseBrowserClient()
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/api/auth/sign-in-with-provider',
                queryParams: {
                    access_type: "offline", // Request refresh token
                    prompt: "consent", // Forces re-prompt to get a new provider_token
                },
            },
        })
    }

    return (<button onClick={handleLogin}>Sign in</button>)
}

export default SignIn;
