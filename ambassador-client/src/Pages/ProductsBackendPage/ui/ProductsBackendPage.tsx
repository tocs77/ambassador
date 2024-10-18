import { useGetProductsBackend } from '@/entities/Product';
import { ProductsList } from '@/features/ProductsList';
import { Layout } from '@/shared/ui/Layout';
import { Header } from '@/widgets/Header';

export const ProductsBackendPage = () => {
  const { data: products, isLoading } = useGetProductsBackend();
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
        <ProductsList products={products.data} />
      </div>
    </Layout>
  );
};
