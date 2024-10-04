import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userController } from '@/shared/api';
import { User } from '@/shared/types';
import { Menu } from '@/widgets/Menu';
import { Nav } from '@/widgets/Nav';
export const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const getUser = async () => {
    const response = await userController.user();
    if (response.type === 'error') {
      navigate('/login');
      return;
    }

    setUser(response.payload);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getUser();
  }, []);

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
