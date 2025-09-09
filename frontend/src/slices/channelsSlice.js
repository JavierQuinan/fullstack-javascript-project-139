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

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    // ✔️ setea todos los canales (bootstrap/tests)
    setChannels: (oldState, action) => ({
      ...oldState,
      items: action.payload, // array de canales
    }),

    setCurrentChannelId: (oldState, action) => ({
      ...oldState,
      currentChannelId: action.payload,
    }),

    // ✅ NUEVOS: para eventos de socket en tiempo real
    channelAdded: (oldState, action) => {
      const ch = action.payload; // { id, name, removable? }
      const exists = oldState.items.some((c) => c.id === ch.id);
      const items = exists ? oldState.items : [...oldState.items, ch];
      return {
        ...oldState,
        items,
        // foco en el canal recién creado (lo que espera el flujo)
        currentChannelId: ch.id,
      };
    },

    channelRemoved: (oldState, action) => {
      const removedId = action.payload; // id
      const filtered = oldState.items.filter((c) => c.id !== removedId);

      let nextId = oldState.currentChannelId;
      if (oldState.currentChannelId === removedId) {
        const general = filtered.find((c) => c.name === 'general');
        nextId = general ? general.id : (filtered[0]?.id ?? null);
      }

      return {
        ...oldState,
        items: filtered,
        currentChannelId: nextId,
      };
    },

    channelRenamed: (oldState, action) => {
      const { id, name } = action.payload;
      const items = oldState.items.map((c) => (c.id === id ? { ...c, name } : c));
      return { ...oldState, items };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialData.fulfilled, (oldState, action) => {
        const { channels, currentChannelId } = action.payload;
        const newState = {
          ...oldState,
          items: channels,
        };

        if (currentChannelId) {
          newState.currentChannelId = currentChannelId;
        } else {
          const generalChannel = channels.find((ch) => ch.name === 'general');
          if (generalChannel) {
            newState.currentChannelId = generalChannel.id;
          }
        }
        return newState;
      })

      .addCase(addChannel.fulfilled, (oldState, action) => {
        const newChannel = action.payload; // { id, name, ... }
        if (!newChannel || !newChannel.id) return oldState;

        const exists = oldState.items.some((c) => c.id === newChannel.id);
        const items = exists ? oldState.items : [...oldState.items, newChannel];

        return {
          ...oldState,
          items,
          currentChannelId: newChannel.id,
        };
      })

      .addCase(removeChannel.fulfilled, (oldState, action) => {
        const { id: removedId } = action.payload;
        const filtered = oldState.items.filter((ch) => ch.id !== removedId);

        let newCurrentChannelId = oldState.currentChannelId;
        if (oldState.currentChannelId === removedId) {
          const generalChannel = filtered.find((ch) => ch.name === 'general');
          newCurrentChannelId = generalChannel ? generalChannel.id : null;
        }

        return {
          ...oldState,
          items: filtered,
          currentChannelId: newCurrentChannelId,
        };
      })

      .addCase(renameChannel.fulfilled, (oldState, action) => {
        const updated = action.payload; // { id, name, ... }
        const channelIndex = oldState.items.findIndex((ch) => ch.id === updated.id);
        if (channelIndex === -1) return oldState;

        const newItems = [...oldState.items];
        newItems[channelIndex] = {
          ...newItems[channelIndex],
          name: updated.name,
        };

        return {
          ...oldState,
          items: newItems,
        };
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

// (opcional)
export const selectCurrentChannelId = (state) => state.channels.currentChannelId;

export default channelsSlice.reducer;
