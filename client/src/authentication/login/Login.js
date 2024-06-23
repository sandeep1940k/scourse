import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { RESPONSE } from '../../constant/response.constant';
import background from "../../images/background/background.jpg"

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
                localStorage.setItem('userId', response.data.userId);
                navigate('/user')
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
        <>
        <div className='background'><img src={background} /></div>
        <div className="card">
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
                    <p >create new account - <span onClick={handleLogin}>sign up</span></p>
                    <button type="submit" value="Signup" >
                        login
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login