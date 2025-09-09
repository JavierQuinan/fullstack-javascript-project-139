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
    // ✔️ NUEVO: para setear todos los canales de golpe (bootstrap, tests, etc.)
    setChannels: (oldState, action) => ({
      ...oldState,
      items: action.payload, // array de canales
    }),

    setCurrentChannelId: (oldState, action) => ({
      ...oldState,
      currentChannelId: action.payload,
    }),
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
        const newChannel = action.payload;
        return {
          ...oldState,
          items: [...oldState.items, newChannel],
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

export const { setChannels, setCurrentChannelId } = channelsSlice.actions;

// (opcional, por si lo usas en componentes)
export const selectCurrentChannelId = (state) => state.channels.currentChannelId;

export default channelsSlice.reducer;
