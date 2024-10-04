import { useEffect, useState } from 'react';
import { Product } from '@/entities/Product';
import { Layout } from '@/shared/ui/Layout';
import { adminController } from '@/shared/api';
import Button from '@mui/material/Button';

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const res = await adminController.getProducts();
    if (res.type === 'payload') {
      setProducts(res.payload);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteHandler = async (id: number) => {
    const res = await adminController.deleteProduct(id);
    if (res.type === 'payload') {
      fetchProducts();
    }
  };

  console.log(products);
  return (
    <Layout>
      <table className='table table-striped table-sm'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>{'Image'}</th>
            <th scope='col'>{'Title'}</th>
            <th scope='col'>{'Description'}</th>
            <th scope='col'>{'Price'}</th>
            <th scope='col'>{'Actions'}</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.image}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <Button variant='contained' color='secondary' onClick={() => deleteHandler(product.id)}>
                  {'Delete'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};
