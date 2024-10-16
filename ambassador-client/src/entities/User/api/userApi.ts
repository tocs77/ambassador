import { rtkApi, ambassadorController } from '@/shared/api';

import { User } from '../model/types/User';
import { Stats } from '../model/types/Stats';

const userApi = rtkApi.enhanceEndpoints({ addTagTypes: ['users', 'user', 'stats', 'rankings'] }).injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      queryFn: async () => {
        const response = await ambassadorController.user();

        if (response.type === 'error') return { error: response.message };
        return { data: response.payload };
      },
      providesTags: () => [{ type: 'user' }],
    }),
    updateUser: builder.mutation<User, Omit<User, 'id' | 'revenue'>>({
      queryFn: async (user) => {
        const response = await ambassadorController.updateUser(user);
        if (response.type === 'error') return { error: response.message };
        return { data: response.payload };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: newUser } = await queryFulfilled;
          dispatch(
            userApi.util.updateQueryData('getUser', undefined, (draft) => {
              Object.assign(draft, newUser);
            }),
          );
        } catch {}
      },
      // invalidatesTags: () => [{ type: 'user' }],
    }),
    updatePassword: builder.mutation<void, { password: string; password_confirm: string }>({
      queryFn: async ({ password, password_confirm }) => {
        const response = await ambassadorController.updatePassword(password, password_confirm);
        if (response.type === 'error') return { error: response.message };
        return { data: undefined };
      },
      invalidatesTags: () => [{ type: 'user' }],
    }),
    getStats: builder.query<Stats[], void>({
      queryFn: async () => {
        const response = await ambassadorController.getStats();
        if (response.type === 'error') return { error: response.message };
        return { data: response.payload };
      },
      providesTags: () => [{ type: 'stats' }],
    }),
    getRankings: builder.query<Record<string, number>, void>({
      queryFn: async () => {
        const response = await ambassadorController.getRankings();
        if (response.type === 'error') return { error: response.message };
        return { data: response.payload };
      },
      providesTags: () => [{ type: 'rankings' }],
    }),
  }),
});

export const useGetUser = userApi.useGetUserQuery;
export const useUpdateUser = userApi.useUpdateUserMutation;
export const useUpdatePassword = userApi.useUpdatePasswordMutation;
export const useGetStats = userApi.useGetStatsQuery;
export const useGetRankings = userApi.useGetRankingsQuery;
