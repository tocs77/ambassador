import { User } from '@/shared/types';
import { instance, Response, parseErrorMessage } from '../axios';

class UserController {
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
}

export const userController = new UserController();
