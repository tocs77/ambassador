import { instance, Response, parseErrorMessage } from '../axios';

interface LoginResponse {
  access_token: string;
  username: string;
  expires_in: number;
  refresh_token: string;
}

interface RegisterArgs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

class AuthController {
  async register({ email, password, confirmPassword, firstName, lastName }: RegisterArgs): Response<LoginResponse> {
    let response;
    try {
      response = await instance.post('/admin/register', {
        email,
        password,
        password_confirm: confirmPassword,
        first_name: firstName,
        last_name: lastName,
      });

      return { payload: response.data, type: 'payload' };
    } catch (error) {
      console.log('Got api load error: ', error);

      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async login(email: string, password: string): Response<LoginResponse> {
    let response;
    try {
      response = await instance.post('/admin/login', {
        email,
        password,
      });
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }

  async logout(): Response<void> {
    let response;
    try {
      response = await instance.post('/admin/logout');
      return { payload: response.data, type: 'payload' };
    } catch (error) {
      return { message: parseErrorMessage(error), type: 'error' };
    }
  }
}

export const authController = new AuthController();
