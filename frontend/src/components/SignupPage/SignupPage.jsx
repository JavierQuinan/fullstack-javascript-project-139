import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { signup } from '../../chatApi/api.js';
import { useAuth } from '../../contexts/AuthProvider.jsx';

const SignupPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logIn } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];

    if (username.length < 3 || username.length > 20) {
      newErrors.push(t('regRules.name'));
    }
    if (password.length < 6) {
      newErrors.push(t('regRules.password'));
    }
    if (password !== confirm) {
      newErrors.push(t('regRules.passwordEquality'));
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { token, username: returnedUser } = await signup(username, password);
      logIn(token, returnedUser);
      navigate('/');
    } catch (err) {
      if (err.response?.status === 409) {
        setErrors([t('errors.userExist')]);
      } else {
        setErrors([t('error')]);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{t('registration')}</h2>

        {errors.length > 0 && (
          <div className="auth-form error-message">
            {errors.map((err, i) => (
              <div key={`${i + 1}`}>{err}</div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="usernameInput">
              {t('placeholders.username')}
            </label>
            <input
              id="usernameInput"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">
              {t('placeholders.password')}
            </label>
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPasswordInput">
              {t('placeholders.confirmPassword')}
            </label>
            <input
              id="confirmPasswordInput"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <button type="submit">
            {t('makeRegistration')}
          </button>
        </form>

        <div className="auth-footer">
          {t('alreadyHaveAccount')}
          {' '}
          <Link to="/login">
            {t('entry')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
