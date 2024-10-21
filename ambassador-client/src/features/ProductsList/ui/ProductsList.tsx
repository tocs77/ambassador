import { Product, ProductFilters } from '@/entities/Product';

interface ProductsListProps {
  products: Product[];
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
}

export const ProductsList = (props: ProductsListProps) => {
  const { products, filters, setFilters } = props;

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, s: e.target.value });
  };

  console.log(products);

  return (
    <div>
      <div className='col-md-12 mb-4 input-group'>
        <input type='text' className='form-control' placeholder='Search...' value={filters.s} onChange={searchHandler} />
      </div>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
        {products.map((product) => (
          <div className='col' key={product.id}>
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
