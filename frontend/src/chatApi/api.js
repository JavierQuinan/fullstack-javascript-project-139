// frontend/src/chatApi/api.js
import axios from 'axios';

const getToken = () => localStorage.getItem('token') || null;

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Interceptor para añadir token ---
api.interceptors.request.use(
  (cfg) => {
    const token = getToken();
    if (token) {
      return {
        ...cfg,
        headers: {
          ...cfg.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }
    return cfg;
  },
  (error) => Promise.reject(error),
);

// --- Interceptor para manejar 401 ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const token = localStorage.getItem('token');
      if (token) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

// ==================== ENDPOINTS ==================== //
export const getData = async () => {
  const { data } = await api.get('/data');
  return data;
};

// ----- LOGIN -----
export const login = async (creds) => {
  try {
    // Acepta tanto { username, password } como { nickname, password }
    const username = creds.username ?? creds.nickname;
    const { password } = creds;

    const { data } = await api.post('/login', { username, password });
    const { token, username: returnedUser } = data || {};

    if (token && returnedUser) {
      localStorage.setItem('token', token);
      localStorage.setItem('username', returnedUser);
    }

    return data;
  } catch (error) {
    console.error('🚨 Error en login:', error);
    throw error;
  }
};

// ----- SIGNUP -----
export const signup = async (creds) => {
  const username = creds.username ?? creds.nickname;
  const { password } = creds;

  const { data } = await api.post('/signup', { username, password });
  return data;
};

// ----- CANALES -----
export const getChannels = async () => {
  const { data } = await api.get('/channels');
  return data;
};

// ----- MENSAJES -----
export const getMessages = async () => {
  const { data } = await api.get('/messages');
  return data;
};

export default api;
