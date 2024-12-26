'use client'
import { useAuth } from "@/hooks/useAuth";

const SignOut = () => {
    const { signOut, isLoading, error } = useAuth()

    return <button onClick={signOut}>Sign out</button>
}

export default SignOut;
