import { User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

type State = {
  user: User | null
}

type Action = {
  updateCurrentUser: () => Promise<void>
}

const supabase = createSupabaseBrowserClient()

const useUserStore = create<State & Action>((set) => ({
  user: null,
  updateCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    set({ user })
  }
}))

export default useUserStore
