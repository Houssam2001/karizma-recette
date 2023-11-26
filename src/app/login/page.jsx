'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getAuthToken, setAuthToken, clearAuthToken } from '@/app/auth'
import { useRouter } from 'next/navigation';
const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const router = useRouter()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  // const [authToken, setAuthToken] = useState('');

  // useEffect(() => {
  // }, [authToken]);
  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        setAuthToken(token);
        console.log('Login successful. Token:', token);
        router.push('/')
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex flex-col items-center md:flex-row md:h-screen">
      <div className="flex items-center justify-center w-full md:w-1/2">
        <Image src="/tagine.webp" alt="Login Image" width={600} height={600} />
      </div>
      <div className="flex flex-col items-center justify-center w-full md:w-1/4">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="mt-2 text-gray-600">
              Please sign in to your account.
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <div>
              <label htmlFor="username" className="block font-bold text-gray-700">
                Nom d&lsquo;utilisateur:
              </label>
              <input
                type="text"
                name="username"
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
                value={credentials.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block font-bold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                required
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
              />
            </div>

            <button type="button" onClick={handleLogin}
              className="w-full px-4 py-3 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"

            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
