import React, { useState } from 'react';
import './Signup.css';
// import http from '../helper/http';
import axios from 'axios';
import { useNavigate } from "react-router-dom"


const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });

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
            console.log('API Response:', response.data);
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
        <div className="container">
            <h2 className="heading">Signup</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label className="label">Username:</label>
                    <input
                        className="input"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="formGroup">
                    <label className="label">Password:</label>
                    <input
                        className="input"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="formGroup">
                    <label className="label">email:</label>
                    <input
                        className="input"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <p onClick={handleLogin}>Login</p>
                <div>
                    <input className="button" type="submit" value="Signup" />
                </div>
            </form>
        </div>
    );
};

export default Signup;
