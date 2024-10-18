import { rtkApi, ambassadorController } from '@/shared/api';

import { Product, ProductsBackendResponse } from '../model/types/Product';

const productsApi = rtkApi.enhanceEndpoints({ addTagTypes: ['frontend', 'backend'] }).injectEndpoints({
  endpoints: (builder) => ({
    getProductsFrontend: builder.query<Product[], void>({
      queryFn: async () => {
        const response = await ambassadorController.getProductsFrontend();
        if (response.type === 'error') return { error: response.message };
        return { data: response.payload };
      },
      providesTags: () => [{ type: 'frontend' }],
    }),

    getProductsBackend: builder.query<ProductsBackendResponse, void>({
      queryFn: async () => {
        const response = await ambassadorController.getProductsBackend();
        if (response.type === 'error') return { error: response.message };
        return { data: response.payload };
      },
      providesTags: () => [{ type: 'backend' }],
    }),
  }),
});

export const useGetProductsFrontend = productsApi.useGetProductsFrontendQuery;
export const useGetProductsBackend = productsApi.useGetProductsBackendQuery;
