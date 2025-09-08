import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Placeholder: la app real pedirá auth para chatear.
  return (
    <main className="container">
      <h1>Chat App</h1>
      <p>Bienvenido. Para empezar a chatear, inicia sesión.</p>
      <Link className="btn" to="/login">Ir al Login</Link>
    </main>
  );
};

export default Home;
