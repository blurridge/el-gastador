import honoClient from '@/lib/rpc/client/hono-client'
import { UserProfileType } from '@/types/schema'
import { RESPONSE_STATUS } from '@/utils/constants'
import { parseApiResponse } from '@/utils/parseResponse'
import { User } from '@supabase/supabase-js'
import { create } from 'zustand'

type State = {
  user: User | null
  userProfile: UserProfileType | null
}

type Action = {
  updateCurrentUser: () => Promise<void>
}


const useUserStore = create<State & Action>((set) => ({
  user: null,
  userProfile: null,
  updateCurrentUser: async () => {
    const userResponse = await parseApiResponse(honoClient.api.auth['get-user'].$get())
    if (userResponse.status === RESPONSE_STATUS.SUCCESS) {
      const profileResponse = await parseApiResponse(honoClient.api.profile['get-user-profile'].$get({
        query: {
          id: userResponse.data.id
        }
      }))
      if (profileResponse.status === RESPONSE_STATUS.SUCCESS) {
        set({ user: userResponse.data as User, userProfile: profileResponse.data as UserProfileType })
      } else {
        set({ user: userResponse.data as User, userProfile: null })
      }
    }
  }
}))

export default useUserStore
