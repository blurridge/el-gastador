'use client'

import { useState, useCallback } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { generateUrl } from '@/utils/generateUrl'
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createSupabaseBrowserClient()
  const router = useRouter()

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: generateUrl('/api/auth/sign-in-with-provider'),
          queryParams: {
            access_type: 'offline', // Request refresh token
            prompt: 'consent', // Forces re-prompt to get a new provider_token
          },
        },
      })
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  const signOut = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get(generateUrl('/api/auth/sign-out'))
      if (response.status !== 200) {
        throw new Error(`Response status: ${response.status}`)
      }
      await supabase.auth.signOut()
      router.push("/login")
    } catch (error) {
      console.log(error)
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  return { signInWithGoogle, signOut, isLoading, error }
}
