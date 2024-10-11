import { rtkApi, adminController } from '@/shared/api';

import { User } from '../model/types/User';

const userApi = rtkApi.enhanceEndpoints({ addTagTypes: ['users', 'user'] }).injectEndpoints({
  endpoints: (builder) => ({
    getUserAdmin: builder.query<User, void>({
      queryFn: async () => {
        const response = await adminController.user();

        if (response.type === 'error') return { error: response.message };
        return { data: response.payload };
      },
      providesTags: () => [{ type: 'user' }],
    }),
    updateUserAdmin: builder.mutation<User, Omit<User, 'id'>>({
      queryFn: async (user) => {
        const response = await adminController.updateUser(user);
        if (response.type === 'error') return { error: response.message };
        return { data: response.payload };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: newUser } = await queryFulfilled;
          dispatch(
            userApi.util.updateQueryData('getUserAdmin', undefined, (draft) => {
              Object.assign(draft, newUser);
            }),
          );
        } catch {}
      },
      // invalidatesTags: () => [{ type: 'user' }],
    }),
    updatePasswordAdmin: builder.mutation<void, { password: string; password_confirm: string }>({
      queryFn: async ({ password, password_confirm }) => {
        const response = await adminController.updatePassword(password, password_confirm);
        if (response.type === 'error') return { error: response.message };
        return { data: undefined };
      },
      invalidatesTags: () => [{ type: 'user' }],
    }),
  }),
});

export const useGetUserAdmin = userApi.useGetUserAdminQuery;
export const useUpdateUserAdmin = userApi.useUpdateUserAdminMutation;
export const useUpdatePasswordAdmin = userApi.useUpdatePasswordAdminMutation;
