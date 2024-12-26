'use client'
import { Button } from '@/components/ui/button'
import googleIcon from "@/assets/icons/google_icon.svg"
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'

const GoogleSignIn = () => {
    const { signInWithGoogle, isLoading, error } = useAuth()
    return (
        <Button onClick={signInWithGoogle} className="w-full" variant="neutral"><Image src={googleIcon} alt="Google Icon" width={24} height={24} /></Button>
    )
}

export default GoogleSignIn;
