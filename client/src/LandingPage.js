import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleSignup = () => {
        navigate("/signup");
    };

    return (
        <>
            <div>LandingPage</div>
            <button onClick={handleSignup}>Signup</button>
        </>
    );
};

export default LandingPage;
