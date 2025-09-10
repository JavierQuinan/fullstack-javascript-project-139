// frontend/src/pages/HomePage.jsx
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main style={{ padding: '1.5rem' }}>
      <h1>Welcome</h1>
      <p>Para chatear, inicia sesión primero.</p>
      <Link to="/login" role="button">Go to Login</Link>
    </main>
  );
}
