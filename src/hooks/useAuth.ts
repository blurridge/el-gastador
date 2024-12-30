'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { parseApiResponse } from '@/utils/parseResponse';
import { RESPONSE_STATUS } from '@/utils/constants';
import honoClient from '@/lib/rpc/client/hono-client';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const signInWithGoogle = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await parseApiResponse(honoClient.api.auth['sign-in-with-provider'].$get())
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        router.push(response.data)
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
      const response = await parseApiResponse(honoClient.api.auth['sign-out'].$get())
      if (response.status === RESPONSE_STATUS.SUCCESS) {
        localStorage.removeItem("currentUser")
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
