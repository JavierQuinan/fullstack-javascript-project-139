// frontend/src/slices/thunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import i18n from 'i18next';
import fetchData from '../chatApi/fetchData.js';
import api from '../chatApi/api.js';

export const fetchInitialData = createAsyncThunk(
  'data/fetchInitialData',
  async () => {
    try {
      const data = await fetchData();
      return data;
    } catch (err) {
      toast.error(i18n.t('errors.network'));
      throw err;
    }
  },
);

// ---------- Normalizadores ----------
const normChannel = (p) => {
  if (!p) return null;

  // { data: { id, attributes: { name, removable } } }
  if (p.data && p.data.id && p.data.attributes) {
    const { id } = p.data;
    const { name, removable } = p.data.attributes;
    return { id, name, removable };
  }

  // { data: { id, name, removable } }
  if (p.data && p.data.id && p.data.name) {
    const { id, name, removable } = p.data;
    return { id, name, removable };
  }

  // { id, attributes: { name, removable } }
  if (p.id && p.attributes) {
    const { id } = p;
    const { name, removable } = p.attributes;
    return { id, name, removable };
  }

  // Plano: { id, name, removable }
  if (p.id && p.name) {
    const { id, name, removable } = p;
    return { id, name, removable };
  }

  return null;
};

const normId = (p) => {
  if (!p) return null;
  if (typeof p === 'string' || typeof p === 'number') return p;
  if (p.data && p.data.id) return p.data.id;
  if (p.id) return p.id;
  return null;
};

// ================== MENSAJES ==================
export const addMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ channelId, body, username }, { rejectWithValue }) => {
    try {
      const response = await api.post('/messages', { body, channelId, username });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// ================== CANALES ==================

// 👇 Blindado: si el POST no trae el canal plano, hacemos GET /channels y buscamos por nombre
export const addChannel = createAsyncThunk(
  'channels/addChannel',
  async ({ name }, { rejectWithValue }) => {
    try {
      const postResp = await api.post('/channels', { name });

      // 1) Intento directo: normalizamos la respuesta del POST
      const direct = normChannel(postResp.data);
      if (direct && direct.name) return direct;

      // 2) Fallback: re-fetch lista y elegimos el canal con ese nombre (el de mayor id)
      const listResp = await api.get('/channels');
      const list = Array.isArray(listResp.data) ? listResp.data : [];
      const candidates = list.filter((c) => c.name === name);
      if (candidates.length > 0) {
        const chosen = candidates.reduce((a, b) => ((a.id ?? 0) > (b.id ?? 0) ? a : b));
        return { id: chosen.id, name: chosen.name, removable: chosen.removable };
      }

      // 3) Último recurso (muy raro): fake local para no romper la UI
      return { id: Date.now(), name, removable: true };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/channels/${id}`);
      const removedId = normId(response.data);
      return { id: removedId ?? id };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, newName }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/channels/${id}`, { name: newName });
      // Intento normalizar a { id, name }
      const direct = normChannel(response.data);
      if (direct && direct.id) return { id: direct.id, name: direct.name };
      // Fallback plano
      if (response.data?.id) return { id: response.data.id, name: response.data.name };
      return { id, name: newName };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
