import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <main className="container">
    <h1>404</h1>
    <p>La página que buscas no existe.</p>
    <Link className="btn" to="/">Volver al inicio</Link>
  </main>
);

export default NotFound;
