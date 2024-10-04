import { NavLink } from 'react-router-dom';

export const Menu = () => {
  return (
    <div className='sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary'>
      <div
        className='offcanvas-md offcanvas-end bg-body-tertiary'
        tabIndex={-1}
        id='sidebarMenu'
        aria-labelledby='sidebarMenuLabel'>
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title' id='sidebarMenuLabel'>
            Company name
          </h5>
        </div>
        <div className='offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto'>
          <ul className='nav flex-column'>
            <li className='nav-item'>
              <NavLink className='nav-link' aria-current='page' to='/users'>
                <svg className='bi'>
                  <use xlinkHref='#house-fill' />
                </svg>
                {'Users'}
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' aria-current='page' to='/products'>
                <svg className='bi'>
                  <use xlinkHref='#house-fill' />
                </svg>
                {'Products'}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
