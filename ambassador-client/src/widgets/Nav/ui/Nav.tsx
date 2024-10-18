import { NavLink, useNavigate } from 'react-router-dom';
// import { authController } from '@/shared/api';
// import { User } from '@/entities/User';
import { useGetUser } from '@/entities/User';
import { authController } from '@/shared/api';
import { Link } from 'react-router-dom';

export const Nav = () => {
  const navigate = useNavigate();

  const { data: user, isLoading } = useGetUser();

  const logoutHandler = async () => {
    await authController.logout();
    navigate('/login');
  };

  return (
    <header className='p-3 text-bg-dark'>
      <div className='container'>
        <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
          <ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
            <li>
              <NavLink to='/products' className={({ isActive }) => `nav-link px-2 ${isActive ? 'text-white' : 'text-secondary'}`}>
                Frontend
              </NavLink>
            </li>
            <li>
              <NavLink to='/backend' className={({ isActive }) => `nav-link px-2 ${isActive ? 'text-white' : 'text-secondary'}`}>
                Backend
              </NavLink>
            </li>
          </ul>

          {user && <Link className='text-white me-3' to='/profile'>{`Welcome ${user.first_name} ${user.last_name}`}</Link>}

          {!isLoading && !user && (
            <div className='text-end'>
              <Link to='/login'>
                <button type='button' className='btn btn-outline-light me-2'>
                  Login
                </button>
              </Link>

              <Link to='/register'>
                <button type='button' className='btn btn-warning'>
                  Sign-up
                </button>
              </Link>
            </div>
          )}
          {user && (
            <>
              <Link to='/stats' className='p-2 text-white text-decoration-none'>
                <button className='btn btn-primary me-2'>Stats</button>
              </Link>
              <Link to='/rankings' className='p-2 text-white text-decoration-none'>
                <button className='btn btn-primary me-2'>Rankings</button>
              </Link>
              <div className='text-end'>
                <button type='button' className='btn btn-outline-light me-2' onClick={logoutHandler}>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
