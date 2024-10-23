import { rtkApi, ambassadorController } from '@/shared/api';

import { Link } from '../model/types/Link';

const linksApi = rtkApi.enhanceEndpoints({ addTagTypes: ['stats', 'link'] }).injectEndpoints({
  endpoints: (builder) => ({
    createLink: builder.mutation<Link, number[]>({
      queryFn: async (products) => {
        const response = await ambassadorController.createLink(products);
        if (response.type === 'error') return { error: response.message };
        return { data: response.payload };
      },
      invalidatesTags: () => [{ type: 'stats' }],
    }),
  }),
});

export const useCreateLink = linksApi.useCreateLinkMutation;
