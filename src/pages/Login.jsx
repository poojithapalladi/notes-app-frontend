import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider.jsx';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        'https://notes-app-backend-li0h.onrender.com/api/auth/login',
        { email, password }
      );

      console.log('Login response:', data);

      if (data.success) {
        // Save token & user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        login(data.user);  // Update global context
        navigate('/');     // Redirect to home
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert(err.response?.data?.message || 'Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className="border shadow p-6 bg-white w-96 rounded">
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700'>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 border rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700'>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-3 py-2 border rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <button
              type='submit'
              disabled={loading}
              className={`w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded ${loading && 'opacity-50 cursor-not-allowed'}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className='text-center mt-2'>
              Don't have an account? <Link to='/register' className='text-teal-600'>Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
