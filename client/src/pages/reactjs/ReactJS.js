import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import './ReactJS.css'

const ReactJS = () => {
    const location = useLocation();
    return (
        <>
            <nav className='react-nav'>
                <ul>
                    <li className={location.pathname === '/user/reactjs' ? 'active': ''} className='active'>
                        <Link to="/user/reactjs">Question-Answer</Link>
                    </li>
                    <li className={location.pathname === '/user/reactjs/mcq' ? 'active': ''}>
                        <Link to="/user/reactjs/mcq">MCQ</Link>
                    </li>
                    <li className={location.pathname === '/user/reactjs/coding-question' ? 'active': ''}>
                        <Link to="/user/reactjs/coding-question">Coding Question</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}

export default ReactJS