// frontend/src/components/Header.jsx
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
      <nav>
        <Link to="/" style={{ fontWeight: 700, textDecoration: 'none' }}>
          Hexlet Chat
        </Link>
      </nav>
    </header>
  );
}
