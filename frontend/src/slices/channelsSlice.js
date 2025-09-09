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

// ---------- Helpers de normalización ----------
const normChannel = (p) => {
  if (!p) return null;

  // JSON:API-like: { data: { id, attributes: { name, removable } } }
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

const normRename = (p) => {
  if (!p) return { id: null, name: null };
  if (p.data && p.data.id && p.data.attributes && p.data.attributes.name) {
    return { id: p.data.id, name: p.data.attributes.name };
  }
  if (p.data && p.data.id && p.data.name) {
    return { id: p.data.id, name: p.data.name };
  }
  if (p.id && p.attributes && p.attributes.name) {
    return { id: p.id, name: p.attributes.name };
  }
  if (p.id && p.name) {
    return { id: p.id, name: p.name };
  }
  return { id: null, name: null };
};

// ---------- Slice ----------
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    // setea todos los canales (bootstrap/tests)
    setChannels: (oldState, action) => ({
      ...oldState,
      items: action.payload, // array de canales ya normalizados
    }),

    setCurrentChannelId: (oldState, action) => ({
      ...oldState,
      currentChannelId: action.payload,
    }),

    // Eventos Socket
    channelAdded: (oldState, action) => {
      const ch = normChannel(action.payload);
      if (!ch) return oldState;
      const exists = oldState.items.some((c) => c.id === ch.id);
      const items = exists ? oldState.items : [...oldState.items, ch];
      return { ...oldState, items, currentChannelId: ch.id };
    },

    channelRemoved: (oldState, action) => {
      const removedId = normId(action.payload);
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
      const { id, name } = normRename(action.payload);
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
          const generalChannel = channels.find((ch) => ch.name === 'general');
          if (generalChannel) newState.currentChannelId = generalChannel.id;
        }
        return newState;
      })

      .addCase(addChannel.fulfilled, (oldState, action) => {
        const ch = normChannel(action.payload);
        if (!ch) return oldState;
        const exists = oldState.items.some((c) => c.id === ch.id);
        const items = exists ? oldState.items : [...oldState.items, ch];
        return { ...oldState, items, currentChannelId: ch.id };
      })

      .addCase(removeChannel.fulfilled, (oldState, action) => {
        const removedId = normId(action.payload);
        if (removedId == null) return oldState;
        const filtered = oldState.items.filter((ch) => ch.id !== removedId);

        let nextId = oldState.currentChannelId;
        if (oldState.currentChannelId === removedId) {
          const generalChannel = filtered.find((ch) => ch.name === 'general');
          nextId = generalChannel ? generalChannel.id : null;
        }

        return { ...oldState, items: filtered, currentChannelId: nextId };
      })

      .addCase(renameChannel.fulfilled, (oldState, action) => {
        const { id, name } = normRename(action.payload);
        if (id == null || !name) return oldState;
        const items = oldState.items.map((c) => (c.id === id ? { ...c, name } : c));
        return { ...oldState, items };
      });
  },
});

export const {
  setChannels,
  setCurrentChannelId,
  channelAdded,
  channelRemoved,
  channelRenamed,
} = channelsSlice.actions;

export const selectCurrentChannelId = (state) => state.channels.currentChannelId;

export default channelsSlice.reducer;
