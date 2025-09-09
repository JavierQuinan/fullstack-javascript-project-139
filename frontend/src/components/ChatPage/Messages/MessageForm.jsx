// frontend/src/components/ChatPage/Messages/MessageForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useAuth } from '../../../contexts/AuthProvider.jsx';
import { addMessage as addMessageThunk } from '../../../slices/thunks.js';
// si tienes un messagesSlice con addMessage (recomendado), úsalo para update optimista:
import { addMessage as addMessageAction } from '../../../slices/messagesSlice.js';

const MessageForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { username } = useAuth();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = text.trim();
    if (!body) return;

    const cleaned = filter.clean(body);

    // 1) Update optimista (aparece al instante en la UI)
    const optimistic = {
      id: Date.now(), // temporal
      channelId: currentChannelId,
      username: username || 'anon',
      body: cleaned,
      createdAt: new Date().toISOString(),
    };
    dispatch(addMessageAction(optimistic));

    // 2) POST real (el server luego emitirá newMessage)
    try {
      await dispatch(addMessageThunk({
        body: cleaned,
        channelId: currentChannelId,
        username: username || 'anon',
      }));
    } finally {
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <div className="input-group">
        <input
          type="text"
          placeholder={t('placeholders.newMessage')}
          aria-label="New message"           // <- EXACTO para los tests
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          {t('send')}
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
