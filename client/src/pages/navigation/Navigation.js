import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <>
      <nav>
        <ul>
          <li className={location.pathname === '/user' ? 'active' : ''}>
            <Link to="/user">Dashboard</Link>
          </li>
          <li className={location.pathname === '/user/question' ? 'active' : ''}>
            <Link to="/user/question">Question</Link>
          </li>
          <li className={location.pathname === '/user/reactjs' ? 'active' : ''}>
            <Link to="/user/reactjs">React JS</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
