import { createBrowserRouter, Navigate } from 'react-router-dom';

import { UsersPage } from '@/Pages/UserPage';
import { LoginPage } from '@/Pages/LoginPage';
import { RegisterPage } from '@/Pages/RegisterPage';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to='/users' /> },
  { path: '/users', element: <UsersPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
]);
