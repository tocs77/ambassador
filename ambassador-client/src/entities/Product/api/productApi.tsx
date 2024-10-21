import { rtkApi, ambassadorController } from '@/shared/api';

import { Product, ProductsBackendResponse } from '../model/types/Product';
import { ProductFilters } from '../model/types/ProductFilters';

interface ProductsBackendArgs extends Partial<ProductFilters> {
  page: number;
}

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

    getProductsBackend: builder.query<ProductsBackendResponse, ProductsBackendArgs>({
      queryFn: async (args) => {
        const response = await ambassadorController.getProductsBackend(args);
        if (response.type === 'error') return { error: response.message };
        return { data: response.payload };
      },
      providesTags: (_, _1, args) => [{ type: 'backend', s: args.s, sort: args.sort, page: args.page }],
    }),
  }),
});

export const useGetProductsFrontend = productsApi.useGetProductsFrontendQuery;
export const useGetProductsBackend = productsApi.useGetProductsBackendQuery;
