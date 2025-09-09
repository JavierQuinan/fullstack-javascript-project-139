// frontend/src/slices/messagesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchInitialData } from './thunks.js';

const initialState = {
  items: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // Setea todos los mensajes (bootstrap)
    setMessages: (oldState, action) => ({
      ...oldState,
      items: action.payload, // array de mensajes
    }),

    // Agrega un mensaje (uso interno)
    messageReceived: (oldState, action) => ({
      ...oldState,
      items: [...oldState.items, action.payload],
    }),

    // Alias para compatibilidad con imports existentes:
    // addMessage hace lo mismo que messageReceived
    addMessage: (oldState, action) => ({
      ...oldState,
      items: [...oldState.items, action.payload],
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialData.fulfilled, (oldState, action) => ({
      ...oldState,
      items: action.payload.messages,
    }));
  },
});

export const {
  setMessages,
  messageReceived,
  addMessage,
} = messagesSlice.actions;

export default messagesSlice.reducer;
