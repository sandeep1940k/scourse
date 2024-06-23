import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './Navigation.css'
const Navigation = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/user">Dashboard</Link>
          </li>
          <li>
            <Link to="/user/question">Question</Link>
          </li>
          <li>
            <Link to="/user/reactjs">React JS</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}

export default Navigation