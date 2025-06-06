import React, { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import axios from 'axios';

export default function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/products/api/token/', {
        username,
        password,
      });

      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      setToken(access); // Update token in parent App component

      alert('Login successful!');
    } catch (error) {
      alert('Login failed. Check your username and password.');
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative"
      style={{
        backgroundImage:
          "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/2327ffa4-20e9-41b6-b77c-462d26f7bfea/d3ecbzg-045f95bb-8610-4dbb-84ab-e1d08fb037d7.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Login card */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6 relative z-10">
        <div className="text-center">
          <LockClosedIcon className="mx-auto h-10 w-10 text-indigo-600" />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">Admin Login</h2>
          <p className="text-sm text-gray-500">Enter your admin credentials</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              required
            />
            <div className="flex justify-end mt-1">
              <a
                href="#"
                className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{' '}
          <a
            href="#"
            className="text-indigo-600 hover:text-indigo-800 font-medium underline"
          >
            Contact Admin
          </a>
        </p>
      </div>
    </div>
  );
}
