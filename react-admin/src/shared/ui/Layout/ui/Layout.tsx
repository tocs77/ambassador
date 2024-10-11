import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetUserAdmin } from '@/entities/User';
import { Menu } from '@/widgets/Menu';
import { Nav } from '@/widgets/Nav';
export const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useGetUserAdmin();

  useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Nav user={user} />
      <div className='container-fluid'>
        <div className='row'>
          <Menu />
          <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4'>
            <div className='table-responsive small'>{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};
