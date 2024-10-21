import { ProductFilters, useGetProductsBackend } from '@/entities/Product';
import { ProductsList } from '@/features/ProductsList';
import { Layout } from '@/shared/ui/Layout';
import { Header } from '@/widgets/Header';
import { useState } from 'react';

export const ProductsBackendPage = () => {
  const [filter, setFilter] = useState<ProductFilters>({ s: '', sort: 'asc' });
  const { data: products, isLoading } = useGetProductsBackend({
    page: 1,
    s: filter.s,
    sort: filter.sort,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!products) {
    return (
      <Layout>
        <div>Not products yet</div>
      </Layout>
    );
  }

  console.log('bbbb', products);
  return (
    <Layout>
      <Header />
      <div className='container'>
        <ProductsList products={products.data} filters={filter} setFilters={setFilter} />
      </div>
    </Layout>
  );
};
