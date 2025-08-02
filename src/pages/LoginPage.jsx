import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = ({ setIsAuth }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsRegister(params.get('mode') === 'register');
  }, [location.search]);

  const updateForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister && formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(errorData.message || 'Something went wrong');
        return;
      }

      const result = await res.json();
      setMessage(result.message);

      if (result.success) {
        if (result.token) {
          localStorage.setItem('token', result.token);
          setIsAuth(true); // <-- Update auth state in App
        }
        navigate('/home'); // Navigate to home page
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <nav className="mb-6">
        <a href="/" className="mr-4 text-blue-600">Home</a>
        <a href="/about" className="text-blue-600">About</a>
      </nav>
      <main>
        <h1 className="text-2xl font-bold mb-4">{isRegister ? 'Register' : 'Login'}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={updateForm}
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={updateForm}
                className="w-full p-2 border rounded"
              />
            </>
          )}
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={updateForm}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={updateForm}
            required
            className="w-full p-2 border rounded"
          />
          {isRegister && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={updateForm}
              className="w-full p-2 border rounded"
            />
          )}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
        <p className="mt-4">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 underline"
          >
            {isRegister
              ? 'Already have an account? Login here'
              : "Don't have an account? Register here"}
          </button>
        </p>
        <p className="mt-2 text-red-500">{message}</p>
      </main>
    </div>
  );
};

export default LoginPage;
