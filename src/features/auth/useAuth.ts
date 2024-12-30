import honoClient from "@/lib/rpc/client/hono-client"
import { RESPONSE_STATUS } from "@/utils/constants"
import { parseApiResponse } from "@/utils/parseResponse"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

const keys = {
    googleSignIn: ["google"],
    signOut: ["sign-out"]
}

export const useGoogleSignIn = () => {
    const router = useRouter()
    return useQuery({
        queryFn: async () => {
            const response = await parseApiResponse(honoClient.api.auth['sign-in-with-provider'].$get())
            if (response.status === RESPONSE_STATUS.SUCCESS) {
                router.push(response.data)
            }
            return response
        },
        queryKey: keys.googleSignIn,
        enabled: false
    })
}

export const useSignOut = () => {
    const router = useRouter()
    return useQuery({
        queryFn: async () => {
            const response = await parseApiResponse(honoClient.api.auth['sign-out'].$get())
            if (response.status === RESPONSE_STATUS.SUCCESS) {
                router.push("/login")
            }
            return response
        },
        queryKey: keys.signOut,
        enabled: false
    })
}
