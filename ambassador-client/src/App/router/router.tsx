import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProductsFrontendPage } from '@/Pages/ProductsFrontendPage';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to='/products' /> },

  {
    path: '/products',
    children: [{ path: '', element: <ProductsFrontendPage />, index: true }],
  },
]);
