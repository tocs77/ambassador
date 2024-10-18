export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface ProductsBackendResponse {
  data: Product[];
  total: number;
  page: number;
  last_page: number;
}
