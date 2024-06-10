import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { RESPONSE } from '../constant/response.constant';
const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
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
            const response = await axios.get('http://localhost:3005/api/authentication/login', { params: formData });
            if (response.status ===  RESPONSE.OK){
                navigate('/dashboard')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleLogin = async () => {
        try {
            navigate('/signup');
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div className="container">
            <h2 className="heading">Login</h2>
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
                <p onClick={handleLogin}>Signup</p>
                <div>
                    <input className="button" type="submit" value="Signup" />
                </div>
            </form>
        </div>
    )
}

export default Login