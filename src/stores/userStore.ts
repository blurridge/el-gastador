import honoClient from '@/lib/rpc/client/hono-client';
import { UserProfileType } from '@/types/schema';
import { RESPONSE_STATUS } from '@/utils/constants';
import { parseApiResponse } from '@/utils/parseResponse';
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  user: User | null;
  userProfile: UserProfileType | null;
  isLoadingUser: boolean;
};

type Action = {
  updateCurrentUser: () => Promise<void>;
};

type UserState = State & Action

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      userProfile: null,
      isLoadingUser: false,
      updateCurrentUser: async () => {
        set({ isLoadingUser: true });
        const userResponse = await parseApiResponse(honoClient.api.auth['get-user'].$get());
        if (userResponse.status === RESPONSE_STATUS.SUCCESS) {
          const profileResponse = await parseApiResponse(honoClient.api.profile['get-user-profile'].$get({
            query: {
              id: userResponse.data.id,
            },
          }));
          if (profileResponse.status === RESPONSE_STATUS.SUCCESS) {
            set({ user: userResponse.data as User, userProfile: profileResponse.data as UserProfileType });
          } else {
            set({ user: userResponse.data as User, userProfile: null });
          }
        } else {
          set({ user: null, userProfile: null });
        }
        set({ isLoadingUser: false });
      },
    }),
    {
      name: 'currentUser',
    }
  )
);

export default useUserStore;
