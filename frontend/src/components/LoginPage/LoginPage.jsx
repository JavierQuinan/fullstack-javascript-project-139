// frontend/src/components/Auth/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../chatApi/api.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login({ username: values.username, password: values.password });
      navigate('/');
    } catch (err) {
      // Mostrar EXACTAMENTE el texto que el test busca
      if (err?.response?.status === 401) {
        setError('Username or password are incorrect');
      } else {
        setError('Network error'); // opcional, no afecta al test
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {error && (
        <div role="alert" style={{ color: 'red', marginBottom: 8 }}>
          {error}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <label htmlFor="username">Your nickname</label>
        <input
          id="username"
          name="username"
          value={values.username}
          onChange={onChange}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
