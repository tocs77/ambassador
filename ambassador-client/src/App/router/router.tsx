import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ProductsFrontendPage } from '@/Pages/ProductsFrontendPage';
import { LoginPage } from '@/Pages/LoginPage';
import { RegisterPage } from '@/Pages/RegisterPage';
import { ProfilePage } from '@/Pages/ProfilePage';
import { StatsPage } from '@/Pages/StatsPage';
import { RankingsPage } from '@/Pages/RankingsPage';
import { ProductsBackendPage } from '@/Pages/ProductsBackendPage';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to='/products' /> },

  {
    path: '/products',
    children: [{ path: '', element: <ProductsFrontendPage />, index: true }],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/profile', element: <ProfilePage /> },
  { path: '/stats', element: <StatsPage /> },
  { path: '/rankings', element: <RankingsPage /> },

  { path: '/backend', element: <ProductsBackendPage /> },
]);
