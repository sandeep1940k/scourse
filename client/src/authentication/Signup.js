import React, { useEffect, useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { RESPONSE } from '../constant/response.constant';
import background1 from "../images/background/background-1.jpg"
import background2 from "../images/background/background-2.jpg"


const Signup = () => {
    const navigate = useNavigate()
    const [background, setBackground] = useState();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });

    useEffect(() => {
        const randomBackground = Math.floor(Math.random() * 2) + 1;
        setBackground(randomBackground === 1 ? background1 : background2);
    }, []);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.post('http://localhost:3005/api/authentication/signup', formData);
            if (response.status === RESPONSE.OK) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleLogin = async () => {
        try {
            navigate('/login');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <div className='background'><img src={background} /></div>
            <div className="card">
                <img src={background} />
                <div className='card-container'>
                    <h1>sign up</h1>
                    <form onSubmit={handleSubmit}>
                        <label >username</label><br />
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <label >password</label><br />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <label >email</label><br />
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <p >you have already account - <span onClick={handleLogin}>login</span></p>
                        <button type="submit" value="Signup" >
                            sign up
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
