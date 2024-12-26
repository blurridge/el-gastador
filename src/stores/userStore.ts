import client from '@/lib/rpc/client/hono-client'
import { User } from '@supabase/supabase-js'
import { create } from 'zustand'

type State = {
  user: User | null
}

type Action = {
  updateCurrentUser: () => Promise<void>
}


const useUserStore = create<State & Action>((set) => ({
  user: null,
  updateCurrentUser: async () => {
    const response = await client.api.auth['get-user'].$get()
    if (response.ok) {
      const { data: user } = await response.json()
      set({ user })
    }
  }
}))

export default useUserStore
