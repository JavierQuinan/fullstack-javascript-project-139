import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginSchema = Yup.object({
  username: Yup.string().required('Usuario obligatorio'),
  password: Yup.string().required('Contraseña obligatoria'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [authError, setAuthError] = useState(null);

  return (
    <main className="auth-wrapper">
      <section className="auth-card">
        <h2>Iniciar sesión</h2>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setAuthError(null);
              // Petición al servidor de chat
              const response = await axios.post('/api/v1/login', values);

              // El servidor devuelve { token: '...' }
              login(response.data.token);

              // Redirigir al home
              navigate('/');
            } catch (err) {
              setAuthError('Credenciales inválidas. Intenta nuevamente.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="auth-form">
              <div className="form-group">
                <label htmlFor="username">Usuario</label>
                <Field id="username" name="username" type="text" />
                <ErrorMessage name="username" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <Field id="password" name="password" type="password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              {authError && <div className="error">{authError}</div>}

              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? 'Ingresando...' : 'Ingresar'}
              </button>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};

export default Login;
