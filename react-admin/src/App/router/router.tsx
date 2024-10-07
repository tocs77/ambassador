import { createBrowserRouter, Navigate } from 'react-router-dom';

import { UsersPage } from '@/Pages/UserPage';
import { LoginPage } from '@/Pages/LoginPage';
import { RegisterPage } from '@/Pages/RegisterPage';
import { LinksPage } from '@/Pages/LinksPage';
import { ProductsPage } from '@/Pages/ProductsPage';
import { CreateProductPage } from '@/Pages/CreateProductPage';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to='/users' /> },
  {
    path: '/users',
    children: [
      { path: '', element: <UsersPage /> },
      { path: ':id/links', element: <LinksPage /> },
    ],
  },
  {
    path: '/products',
    children: [
      { path: '', element: <ProductsPage />, index: true },
      { path: 'create', element: <CreateProductPage /> },
      { path: 'edit/:id', element: <CreateProductPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
]);
