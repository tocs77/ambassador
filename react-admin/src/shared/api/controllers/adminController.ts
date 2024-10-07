import { User } from '@/shared/types';
import { instance, Response, parseErrorMessage } from '../axios';
import { Link } from '@/entities/Link';
import { Product } from '@/entities/Product';

class AdminController {
  async user(): Response<User> {
    let response;
    try {
      response = await instance.get('/admin/user');

      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async getAmbassdors(): Response<User[]> {
    let response;
    try {
      response = await instance.get('/admin/ambassadors');

      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async getLinks(id: string): Response<Link[]> {
    let response;
    try {
      response = await instance.get(`admin/user/${id}/links`);
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async getProducts(): Response<Product[]> {
    let response;
    try {
      response = await instance.get(`admin/products`);
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async getProduct(id: number): Response<Product> {
    let response;
    try {
      response = await instance.get(`admin/products/${id}`);
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async deleteProduct(id: number): Response<void> {
    let response;
    try {
      response = await instance.delete(`admin/products/${id}`);
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async createProduct(product: Omit<Product, 'id'>): Response<Product> {
    let response;
    try {
      response = await instance.post(`admin/products`, product);
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async updateProduct(product: Product): Response<Product> {
    let response;
    try {
      response = await instance.patch(`admin/products/${product.id}`, product);
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }
}

export const adminController = new AdminController();
