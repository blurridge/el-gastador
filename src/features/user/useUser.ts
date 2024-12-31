import { useToast } from "@/hooks/use-toast";
import honoClient from "@/lib/rpc/client/hono-client";
import { PartialUpdateUserProfileType, UserProfileType } from "@/types/schema";
import { RESPONSE_STATUS } from "@/utils/constants";
import { parseApiResponse } from "@/utils/parseResponse";
import { User } from "@supabase/supabase-js";
import { skipToken, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const keys = {
    getUserInfo: ["user-info"],
    getUserProfile: ["user-profile"],
    skip: ["skip"]
}

export const useGetUserInfo = () => {
    return useQuery({
        queryFn: async () => {
            const userResponse = await parseApiResponse(honoClient.api.auth['get-user'].$get());
            if (userResponse.status === RESPONSE_STATUS.SUCCESS) {
                return userResponse.data as User
            } else {
                return null
            }
        },
        queryKey: keys.getUserInfo
    })
}

export const useGetUserProfile = (user: User) => {
    return useQuery({
        queryFn: user ? async () => {
            const profileResponse = await parseApiResponse(honoClient.api.profile['get-user-profile'].$get({
                query: {
                    id: user.id,
                },
            }));
            if (profileResponse.status === RESPONSE_STATUS.SUCCESS) {
                return profileResponse.data as UserProfileType
            } else {
                return null
            }
        } : skipToken,
        queryKey: user ? [...keys.getUserProfile, user.id] : keys.skip,
        enabled: !!user
    })
}

export const useUpdateUserProfile = (user: User) => {
    const queryClient = useQueryClient();
    const { toast } = useToast()

    return useMutation({
        mutationFn: async (userProfilePayload: PartialUpdateUserProfileType) => {
            const response = await parseApiResponse(honoClient.api.profile["update-user-profile"].$post({
                json: userProfilePayload
            }))
            if (response.status === RESPONSE_STATUS.SUCCESS) {
                toast({ title: response.message, description: `User profile updated for ${user.id}.` })
            }
            else {
                toast({ variant: "destructive", title: response.message, description: `Failed updating user profile for ${user.id}.` })
            }
        },
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: [...keys.getUserProfile, user.id]
            })
        },
    })
}
