// frontend/src/index.js
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import filter from 'leo-profanity';
import reportWebVitals from './reportWebVitals';
import init from './init.jsx';

if (!filter.hasDictionary('en')) {
  filter.loadDictionary('en');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
init().then((vdom) => root.render(vdom));
reportWebVitals();
