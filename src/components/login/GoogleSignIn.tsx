'use client'
import { Button } from '@/components/ui/button'
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { generateUrl } from "@/utils/generateUrl"
import googleIcon from "@/assets/icons/google_icon.svg"
import Image from 'next/image'

const GoogleSignIn = () => {
    const handleLogin = async () => {
        const supabase = createSupabaseBrowserClient()
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: generateUrl('/api/auth/sign-in-with-provider'),
                queryParams: {
                    access_type: "offline", // Request refresh token
                    prompt: "consent", // Forces re-prompt to get a new provider_token
                },
            },
        })
    }
    return (
        <Button onClick={handleLogin} className="w-full" variant="neutral"><Image src={googleIcon} alt="Google Icon" width={24} height={24} /></Button>
    )
}

export default GoogleSignIn;
