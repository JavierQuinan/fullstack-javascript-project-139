// frontend/src/components/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { login as loginRequest } from '../../chatApi/api.js';
import { useAuth } from '../../contexts/AuthProvider.jsx';

const LoginPage = () => {
  const { t } = useTranslation();
  const [authError, setAuthError] = useState(null);
  const { logIn } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(t('errors.required')),
    password: Yup.string().required(t('errors.required')),
  });

  const initialValues = {
    username: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setAuthError(null);
      const {
        token,
        username: returnedUser,
      } = await loginRequest(values.username, values.password);

      logIn(token, returnedUser);
      navigate('/');
    } catch (error) {
      setAuthError(t('errors.invalidFeedback'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{t('entry')}</h2>

        {authError && <div className="auth-form error-message">{authError}</div>}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="auth-form">
              <div className="form-group">
                <label htmlFor="username">{t('placeholders.login')}</label>
                <Field id="username" name="username" type="text" />
                <ErrorMessage name="username" component="div" className="error-field" />
              </div>

              <div className="form-group">
                <label htmlFor="password">{t('placeholders.password')}</label>
                <Field id="password" name="password" type="password" />
                <ErrorMessage name="password" component="div" className="error-field" />
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('loading') : t('entry')}
              </button>
            </Form>
          )}
        </Formik>

        <div className="auth-footer">
          {t('noAccount')}
          {' '}
          <Link to="/signup">
            {t('makeRegistration')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
