import React, { useState } from 'react';
import './Signup.css'; 

const Signup = () => {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData); 
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
                <div>
                    <input className="button" type="submit" value="Signup" />
                </div>
            </form>
        </div>
    );
};

export default Signup;
