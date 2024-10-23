import { ProductFilters, useGetProductsFrontend } from '@/entities/Product';
import { ProductsList } from '@/features/ProductsList';
import { Layout } from '@/shared/ui/Layout';
import { Header } from '@/widgets/Header';
import { useMemo, useState } from 'react';

export const ProductsFrontendPage = () => {
  const { data: products, isLoading } = useGetProductsFrontend();
  const [filter, setFilter] = useState<ProductFilters>({ s: '', sort: 'asc' });

  const prods = useMemo(() => {
    if (!products) {
      return [];
    }
    const filteredProducts = products.filter((product) => {
      return (
        product.title.toLowerCase().includes(filter.s.toLowerCase()) ||
        product.description.toLowerCase().includes(filter.s.toLowerCase())
      );
    });
    if (!filter.sort) return filteredProducts;
    if (filter.sort === 'asc') return filteredProducts.sort((a, b) => a.price - b.price);

    return filteredProducts.sort((a, b) => b.price - a.price);
  }, [products, filter]);

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

  return (
    <Layout>
      <Header />
      <div className='container'>
        <ProductsList products={prods} filters={filter} setFilters={setFilter} />
      </div>
    </Layout>
  );
};
