import { User } from '@supabase/supabase-js';
import { skipToken, useQuery } from '@tanstack/react-query';

import honoClient from '@/lib/rpc/client/hono-client';

import { CategoryType } from '@/types/schema';

import { RESPONSE_STATUS } from '@/utils/constants';
import { parseApiResponse } from '@/utils/parseResponse';

const keys = {
  getUserCategories: ['get-user-categories'],
  skip: ['skip'],
};

export const useGetUserCategories = (user: User) => {
  return useQuery({
    queryFn: user
      ? async () => {
          const categoryResponse = await parseApiResponse(
            honoClient.api.categories['get-user-categories'].$get({
              query: {
                id: user.id,
              },
            }),
          );
          if (categoryResponse.status === RESPONSE_STATUS.SUCCESS) {
            return categoryResponse.data || ([] as CategoryType[]);
          } else {
            return [] as CategoryType[];
          }
        }
      : skipToken,
    queryKey: user ? [...keys.getUserCategories, user.id] : keys.skip,
    enabled: !!user,
  });
};
