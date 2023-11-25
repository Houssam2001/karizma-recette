'use client'
import { useState ,useEffect} from 'react';
import { getAuthToken, setAuthToken, clearAuthToken } from '@/app/auth'
import { useRouter } from 'next/navigation';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const router =useRouter()
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
    <div>
      <h1>Login</h1>
      <form>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
