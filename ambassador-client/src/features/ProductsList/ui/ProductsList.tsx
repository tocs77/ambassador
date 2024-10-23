import { Product, ProductFilters } from '@/entities/Product';
import { useEffect, useState } from 'react';

import classes from './ProductsList.module.scss';
import { useCreateLink } from '@/entities/Link';

interface ProductsListProps {
  products: Product[];
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
}

export const ProductsList = (props: ProductsListProps) => {
  const { products, filters, setFilters } = props;
  const [selected, setSelected] = useState<number[]>([]);
  const [createLink, { error, isSuccess }] = useCreateLink();
  const [notify, setNotify] = useState({
    show: false,
    error: false,
    message: '',
  });

  useEffect(() => {
    if (error) {
      setNotify({
        show: true,
        error: true,
        message: error as string,
      });
    }
    if (isSuccess) {
      setNotify({
        show: true,
        error: false,
        message: 'Link created successfully',
      });
      setSelected([]);
    }
    setTimeout(() => setNotify({ show: false, error: false, message: '' }), 3000);
  }, [error, isSuccess]);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, s: e.target.value });
  };

  const toggleSelected = (id: number) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
      return;
    }
    setSelected([...selected, id]);
  };

  const generateHandler = () => {
    createLink(selected);
  };

  const genetateButton =
    selected.length === 0 ? null : (
      <div className='col-md-12'>
        <button className='btn btn-primary' onClick={generateHandler}>
          Generate link
        </button>
      </div>
    );

  const info = notify.show ? (
    <div className={notify.error ? 'alert alert-danger' : 'alert alert-info'} role='alert'>
      {notify.message}
    </div>
  ) : null;

  return (
    <div>
      {info}
      <div className='col-md-12 mb-4 input-group'>
        <input type='text' className='form-control' placeholder='Search...' value={filters.s} onChange={searchHandler} />
        <div className='input-group-append'>
          <select
            className='form-select'
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value as 'asc' | 'desc' })}>
            <option value='asc'>Price ascending</option>
            <option value='desc'>Price descending</option>
          </select>
        </div>
        <div className='input-group-append'> {genetateButton}</div>
      </div>

      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
        {products.map((product) => (
          <div
            className={`${classes.product} ${selected.includes(product.id) ? classes.selected : ''} col`}
            key={product.id}
            onClick={() => toggleSelected(product.id)}>
            <div className='card shadow-sm'>
              <img
                src={product.image}
                alt={product.title}
                className='bd-placeholder-img card-img-top'
                width='100%'
                height='225'
              />

              <div className='card-body'>
                <p className='card-text'>{product.title}</p>
                <p className='card-text'>{product.description}</p>

                <div className='d-flex justify-content-between align-items-center'>
                  <small className='text-body-secondary'>${product.price}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
