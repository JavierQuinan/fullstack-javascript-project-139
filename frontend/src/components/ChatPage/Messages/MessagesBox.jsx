// frontend/src/components/ChatPage/Messages/MessagesBox.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const MessagesBox = () => {
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messages.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  // Filtrar solo los mensajes del canal actual
  const filteredMessages = messages.filter(
    (msg) => msg.channelId === currentChannelId,
  );

  return (
    <div className="messages-box-container">
      {filteredMessages.length > 0 ? (
        <div className="messages-list">
          {filteredMessages.map((msg) => (
            <div key={msg.id} className="message-item">
              <strong className="message-author">{msg.username || 'anon'}</strong>
              <span className="message-body">{msg.body}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-messages">
          <p>{t('noMessages') || 'No messages yet'}</p>
        </div>
      )}
    </div>
  );
};

export default MessagesBox;
