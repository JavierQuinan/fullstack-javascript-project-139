// frontend/src/pages/LoginPage.jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

export default function LoginPage() {
  return (
    <main style={{ padding: '1.5rem', maxWidth: 420 }}>
      <h1>Login</h1>

      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          // Paso 2/12: NO enviar aún (solo demo)
          console.log('Form values:', values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form aria-labelledby="login-form-title">
            <fieldset style={{ border: '0', padding: 0, margin: 0 }}>
              <legend id="login-form-title" style={{ marginBottom: '.5rem' }}>
                Authorization
              </legend>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="username">Username</label>
                <Field
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  autoComplete="username"
                  aria-required="true"
                />
                <div style={{ color: 'crimson', fontSize: '.9rem' }}>
                  <ErrorMessage name="username" />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="password">Password</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-required="true"
                />
                <div style={{ color: 'crimson', fontSize: '.9rem' }}>
                  <ErrorMessage name="password" />
                </div>
              </div>

              <button type="submit" disabled={isSubmitting}>
                Log in
              </button>
            </fieldset>
          </Form>
        )}
      </Formik>
    </main>
  );
}
