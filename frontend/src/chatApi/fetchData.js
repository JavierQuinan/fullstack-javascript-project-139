// frontend/src/chatApi/fetchData.js
import api from './api.js';

export default async function fetchData() {
  // Trae el seed completo: { channels, messages, currentChannelId, username }
  const { data } = await api.get('/data'); // -> /api/v1/data por tu baseURL
  return data;
}
