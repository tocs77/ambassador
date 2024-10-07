import { useNavigate, useParams } from 'react-router-dom';
import { Product, ProductForm } from '@/entities/Product';
import { Layout } from '@/shared/ui/Layout';
import { useEffect, useState } from 'react';
import { adminController } from '@/shared/api';

export const CreateProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (!id) return;
    fetchProduct(id);
  }, [id]);

  const fetchProduct = async (id: string) => {
    const res = await adminController.getProduct(Number(id));
    if (res.type === 'payload') {
      setProduct(res.payload);
    }
  };

  const navigate = useNavigate();
  const closeForm = () => navigate('/products');
  return (
    <Layout>
      <ProductForm closeForm={closeForm} product={product} />
    </Layout>
  );
};
