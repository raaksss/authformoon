'use client';

import { useState } from 'react';
import axios from 'axios';
import { setToken, setUser } from '@/redux/auth/auth.slice';
import useAuthSession from '../hooks/useAuthSession';
import { useAppDispatch } from '@/redux/store';
import axiosInstance from '../lib/axiosInstance';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const user = useAuthSession();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token); 
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      dispatch(setToken(token))

      const userInfoResponse = await axiosInstance.get('/check-session');
      dispatch(setUser(userInfoResponse.data.user));
    } catch (error) {
      console.error('Login failed:', error);
    }
  };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {user ? (
          <div>
            <h2 className="text-xl font-bold">Welcome, {user.username}</h2>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-black text-center">Login</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 mt-4 text-black border rounded-md"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 mt-4 border text-black rounded-md"
            />
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
            >
              Login
            </button>
          </div>
        )}
        <div className="mt-6 p-4 border rounded-md text-black bg-gray-50">
          <h3 className="text-lg font-semibold">The hook should be usable like this: </h3>
          <pre className="mt-2 p-2 text-gray-500 bg-gray-100 rounded-md">
            <code>
              {`const { user } = useAuthSession();
if (user) {
  console.log('User:', user.username);
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
