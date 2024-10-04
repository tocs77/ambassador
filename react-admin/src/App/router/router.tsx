import { createBrowserRouter, Navigate } from 'react-router-dom';

import { UsersPage } from '@/Pages/UserPage';
import { LoginPage } from '@/Pages/LoginPage';
import { RegisterPage } from '@/Pages/RegisterPage';
import { LinksPage } from '@/Pages/LinksPage';
import { ProductsPage } from '@/Pages/ProductsPage';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to='/users' /> },
  {
    path: '/users',
    children: [
      { path: '', element: <UsersPage /> },
      { path: ':id/links', element: <LinksPage /> },
    ],
  },
  { path: '/products', element: <ProductsPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
]);
