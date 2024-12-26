'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import client from '@/lib/rpc/client/hono-client';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const signInWithGoogle = async () => {
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
  }

  const signOut = async () => {
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
  }

  return { signInWithGoogle, signOut, isLoading, error }
}
