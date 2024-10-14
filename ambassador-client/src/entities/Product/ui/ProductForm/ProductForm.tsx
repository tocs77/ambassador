import { Button } from '@mui/material';
import classes from './ProductForm.module.scss';
import { useEffect, useState } from 'react';
import { adminController } from '@/shared/api';
import { Product } from '../../model/types/Product';

interface ProductFormProps {
  closeForm?: () => void;
  product?: Product;
}
export const ProductForm = (props: ProductFormProps) => {
  const { closeForm, product } = props;
  const [title, setTitle] = useState(product?.title || '');
  const [description, setDescription] = useState(product?.description || '');
  const [image, setImage] = useState(product?.image || '');
  const [price, setPrice] = useState(product?.price || 0);

  useEffect(() => {
    if (!product) return;
    setTitle(product.title);
    setDescription(product.description);
    setImage(product.image);
    setPrice(product.price);
  }, [product]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fn = product ? updateProduct : createProduct;
    const res = await fn();
    if (!res) {
      console.log('error');
      return;
    }
    if (res.type === 'error') {
      alert(res.message);
      return;
    }
    closeForm?.();
  };

  const createProduct = async () => {
    return await adminController.createProduct({ title, description, image, price });
  };

  const updateProduct = async () => {
    if (!product) return;
    return await adminController.updateProduct({ ...product, title, description, image, price });
  };

  return (
    <form className={classes.ProductForm} onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title' className={classes.label}>
          Title
        </label>
        <input type='text' id='title' className={classes.input} value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label htmlFor='description' className={classes.label}>
          Description
        </label>
        <input
          type='text'
          id='description'
          className={classes.input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor='image' className={classes.label}>
          Image
        </label>
        <input type='text' id='image' className={classes.input} value={image} onChange={(e) => setImage(e.target.value)} />
      </div>
      <div>
        <label htmlFor='price' className={classes.label}>
          Price
        </label>
        <input
          type='number'
          id='price'
          className={classes.input}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <Button variant='contained' className={classes.button} type='submit'>
        {product ? 'Update' : 'Create'}
      </Button>
    </form>
  );
};
