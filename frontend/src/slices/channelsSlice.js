// frontend/src/slices/channelsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchInitialData,
  addChannel,
  removeChannel,
  renameChannel,
} from './thunks.js';

const initialState = {
  items: [],
  currentChannelId: null,
};

// Normalización mínima por si llegan formas distintas desde socket
const normChannel = (p) => {
  if (!p) return null;
  if (p.data && p.data.id && p.data.attributes) {
    const { id } = p.data;
    const { name, removable } = p.data.attributes;
    return { id, name, removable };
  }
  if (p.data && p.data.id && p.data.name) {
    const { id, name, removable } = p.data;
    return { id, name, removable };
  }
  if (p.id && p.attributes) {
    const { id } = p;
    const { name, removable } = p.attributes;
    return { id, name, removable };
  }
  if (p.id && p.name) {
    const { id, name, removable } = p;
    return { id, name, removable };
  }
  return null;
};

const getId = (p) => {
  if (p == null) return null;
  if (typeof p === 'number' || typeof p === 'string') return p;
  if (p.data?.id) return p.data.id;
  if (p.id) return p.id;
  return null;
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId: (oldState, action) => ({
      ...oldState,
      currentChannelId: action.payload,
    }),

    // Opcional (por si lo usas en bootstrap)
    setChannels: (oldState, action) => ({
      ...oldState,
      items: action.payload,
    }),

    // === Eventos de socket ===
    channelAdded: (oldState, action) => {
      const ch = normChannel(action.payload);
      if (!ch || !ch.id) return oldState;
      const exists = oldState.items.some((c) => c.id === ch.id);
      const items = exists ? oldState.items : [...oldState.items, ch];
      return { ...oldState, items, currentChannelId: ch.id };
    },

    channelRemoved: (oldState, action) => {
      const removedId = getId(action.payload);
      if (removedId == null) return oldState;
      const filtered = oldState.items.filter((c) => c.id !== removedId);

      let nextId = oldState.currentChannelId;
      if (oldState.currentChannelId === removedId) {
        const general = filtered.find((c) => c.name === 'general');
        nextId = general ? general.id : (filtered[0]?.id ?? null);
      }

      return { ...oldState, items: filtered, currentChannelId: nextId };
    },

    channelRenamed: (oldState, action) => {
      const payload = action.payload || {};
      const id = getId(payload);
      const name =
        payload?.data?.attributes?.name ??
        payload?.data?.name ??
        payload?.attributes?.name ??
        payload?.name ??
        null;

      if (id == null || !name) return oldState;
      const items = oldState.items.map((c) => (c.id === id ? { ...c, name } : c));
      return { ...oldState, items };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.fulfilled, (oldState, action) => {
        const { channels, currentChannelId } = action.payload;
        const newState = { ...oldState, items: channels };

        if (currentChannelId) {
          newState.currentChannelId = currentChannelId;
        } else {
          const general = channels.find((ch) => ch.name === 'general');
          if (general) newState.currentChannelId = general.id;
        }
        return newState;
      })

      .addCase(addChannel.fulfilled, (oldState, action) => {
        const ch = normChannel(action.payload);
        if (!ch || !ch.id) return oldState;
        const exists = oldState.items.some((c) => c.id === ch.id);
        const items = exists ? oldState.items : [...oldState.items, ch];
        return { ...oldState, items, currentChannelId: ch.id };
      })

      .addCase(removeChannel.fulfilled, (oldState, action) => {
        const removedId = getId(action.payload);
        if (removedId == null) return oldState;

        const filtered = oldState.items.filter((ch) => ch.id !== removedId);
        let nextId = oldState.currentChannelId;
        if (oldState.currentChannelId === removedId) {
          const general = filtered.find((ch) => ch.name === 'general');
          nextId = general ? general.id : (filtered[0]?.id ?? null);
        }
        return { ...oldState, items: filtered, currentChannelId: nextId };
      })

      .addCase(renameChannel.fulfilled, (oldState, action) => {
        const upd = normChannel(action.payload);
        const id = upd?.id ?? action.payload?.id ?? action.payload?.data?.id ?? null;
        const name =
          upd?.name ??
          action.payload?.data?.attributes?.name ??
          action.payload?.data?.name ??
          action.payload?.attributes?.name ??
          action.payload?.name ??
          null;

        if (id == null || !name) return oldState;
        const items = oldState.items.map((c) => (c.id === id ? { ...c, name } : c));
        return { ...oldState, items };
      });
  },
});

export const {
  setCurrentChannelId,
  setChannels,
  channelAdded,
  channelRemoved,
  channelRenamed,
} = channelsSlice.actions;

export default channelsSlice.reducer;
