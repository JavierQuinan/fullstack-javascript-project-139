// frontend/src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main style={{ padding: '1.5rem' }}>
      <h1>404 — Not Found</h1>
      <p>La ruta que intentaste no existe.</p>
      <Link to="/">Back to Hexlet Chat</Link>
    </main>
  );
}
