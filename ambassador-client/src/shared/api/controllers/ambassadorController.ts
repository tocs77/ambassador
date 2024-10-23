import { Stats, User } from '@/entities/User';
import { instance, Response, parseErrorMessage } from '../axios';
import { Link } from '@/entities/Link';
import { Product, ProductFilters, ProductsBackendResponse } from '@/entities/Product';
import { Order } from '@/entities/Order';

interface ProductsBackendArgs extends Partial<ProductFilters> {
  page: number;
}

class AmbassadorController {
  async user(): Response<User> {
    let response;
    try {
      response = await instance.get('/ambassador/user');

      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async getAmbassdors(): Response<User[]> {
    let response;
    try {
      response = await instance.get('/ambassador/ambassadors');

      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async getLinks(id: string): Response<Link[]> {
    let response;
    try {
      response = await instance.get(`ambassador/user/${id}/links`);
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async getProductsFrontend(): Response<Product[]> {
    let response;
    try {
      response = await instance.get('ambassador/products/frontend');
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async getProductsBackend(args?: ProductsBackendArgs): Response<ProductsBackendResponse> {
    const a: ProductsBackendArgs = args || { page: 1 };
    const { page = 1, s = '', sort = 'asc' } = a;
    let response;
    try {
      response = await instance.get('ambassador/products/backend', {
        params: {
          page,
          s,
          sort,
        },
      });
      if (!response.data.data) {
        response.data.data = [];
      }
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async getProduct(id: number): Response<Product> {
    let response;
    try {
      response = await instance.get(`ambassador/products/${id}`);
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async deleteProduct(id: number): Response<void> {
    let response;
    try {
      response = await instance.delete(`ambassador/products/${id}`);
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async createProduct(product: Omit<Product, 'id'>): Response<Product> {
    let response;
    try {
      response = await instance.post(`ambassador/products`, product);
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async updateProduct(product: Product): Response<Product> {
    let response;
    try {
      response = await instance.patch(`ambassador/products/${product.id}`, product);
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async getOrders(): Response<Order[]> {
    let response;
    try {
      response = await instance.get(`ambassador/orders`);
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async getOrderItems(): Response<Order> {
    let response;
    try {
      response = await instance.get('ambassador/orderitems');
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async updateUser(user: Omit<User, 'id' | 'revenue'>): Response<User> {
    let response;
    try {
      response = await instance.patch('ambassador/user', user);
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async updatePassword(password: string, password_confirm: string): Response<void> {
    let response;
    try {
      response = await instance.patch('ambassador/user/password', { password, password_confirm });
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async getStats(): Response<Stats[]> {
    let response;
    try {
      response = await instance.get('ambassador/stats');
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async getRankings(): Response<Record<string, number>> {
    let response;
    try {
      response = await instance.get('ambassador/rankings');
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async createLink(products: number[]): Response<Link> {
    let response;
    try {
      response = await instance.post('ambassador/links', { products });
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }
}

export const ambassadorController = new AmbassadorController();
