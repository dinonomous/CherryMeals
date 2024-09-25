'use client';

import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null); // Reset error
  
      try {
        const response = await axios.post(
          'http://localhost:2560/api/v1/auth/login',
          { email, password },
          { withCredentials: true } // Include credentials
        );
        
        // Handle successful login response here
        console.log('Login successful:', response.data);
      } catch (err) {
        console.error('Error logging in:', err);
        setError('Login failed. Please check your credentials and try again.');
      }};

    return (
        <div>
            <form onSubmit={handleLogin}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
