// frontend/src/index.js
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import filter from 'leo-profanity';

import reportWebVitals from './reportWebVitals';
import init from './init.jsx';

// Carga del diccionario sin usar hasDictionary ni imports de /lib/dictionaries
try {
  if (typeof filter.loadDictionary === 'function') {
    filter.loadDictionary('en'); // en v1.x funciona así
  }
} catch (e) {
  // no bloquees el arranque si algo falla
  // eslint-disable-next-line no-console
  console.warn('leo-profanity: no se pudo cargar el diccionario', e);
}

const rootEl = document.getElementById('root');
const root = ReactDOM.createRoot(rootEl);

init()
  .then((vdom) => root.render(vdom))
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Init failed:', err);
    rootEl.textContent = 'App init error';
  });

reportWebVitals();
