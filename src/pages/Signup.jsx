import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Signup = () => {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState(''); 
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/auth/register', { name, email, password });
      console.log('Register response:', data);
      if (data.success) {
         navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.log('Register error:', err);
      alert(err.response?.data?.message || 'Error registering');
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className="border shadow p-6 bg-white w-96 rounded">
        <h2 className='text-2xl font-bold mb-4'>Signup</h2>
        <form onSubmit={handleSubmit}> 
          <div className='mb-4'> 
            <label className='block text-gray-700'>Name</label>
            <input type="text" value={name} onChange={e=>setName(e.target.value)}
              className=' w-full px-3 py-2 border rounded' required/>
          </div>
          <div className='mb-4'> 
            <label className='block text-gray-700'>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
              className='w-full px-3 py-2 border rounded' required/>
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
              className='w-full px-3 py-2 border rounded' required/>
          </div>
          <div className='mb-4'>
            <button type='submit' className='w-full bg-teal-600 text-white py-2 rounded'>Signup</button>
            <p className='text-center mt-2'>
              Already have an account? <Link to='/login' className='text-teal-600'>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
