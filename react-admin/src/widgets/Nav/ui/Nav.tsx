import { useNavigate } from 'react-router-dom';
import { authController } from '@/shared/api';
import { User } from '@/shared/types';
import { Link } from 'react-router-dom';

interface NavProps {
  user: User | undefined;
}

export const Nav = (props: NavProps) => {
  const navigate = useNavigate();
  const { user } = props;
  const logoutHandler = async () => {
    await authController.logout();
    navigate('/login');
  };
  return (
    <header className='navbar sticky-top bg-dark flex-md-nowrap p-0 shadow' data-bs-theme='dark'>
      <a className='navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white' href='#'>
        Umbrella
      </a>
      {user && (
        <Link
          to='/profile'
          className='p-2 text-white text-decoration-none'>{`Welcome, ${user.first_name} ${user.last_name}`}</Link>
      )}
      {user && (
        <button className='btn btn-outline-secondary me-2' onClick={logoutHandler}>
          Logout
        </button>
      )}
    </header>
  );
};
