'use client'
import { useState, useCallback } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation';
import client from '@/lib/rpc/client/hono-client';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createSupabaseBrowserClient()
  const router = useRouter()

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await client.api.auth['sign-in-with-provider'].$get()
      if (response.ok) {
        const { data: url } = await response.json();
        if (url) {
          router.push(url)
        }
      }
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
      const response = await client.api.auth['sign-out'].$get()
      if (response.ok) {
        router.push("/login")
      }
    } catch (error) {
      console.log(error)
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  return { signInWithGoogle, signOut, isLoading, error }
}
