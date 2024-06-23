import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './ReactJS.css'

const ReactJS = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/user/reactjs">Question-Answer</Link>
                    </li>
                    <li>
                        <Link to="/user/reactjs/mcq">MCQ</Link>
                    </li>
                    <li>
                        <Link to="/user/reactjs/coding-question">Coding Question</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
}

export default ReactJS