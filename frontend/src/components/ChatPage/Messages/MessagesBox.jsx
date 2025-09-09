// frontend/src/components/ChatPage/Messages/MessagesBox.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const MessagesBox = () => {
  const { t } = useTranslation();
  const messages = useSelector((state) => state.messages.items) || [];
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const filteredMessages = currentChannelId == null
    ? messages
    : messages.filter((msg) => msg.channelId === currentChannelId);

  return (
    <div>
      <h2>{t('messagesTitle')}</h2>
      <ul className="list-unstyled m-0">
        {filteredMessages.map((msg) => (
          <li key={msg.id ?? `${msg.channelId}-${msg.createdAt}-${msg.username ?? 'anon'}-${msg.body}`}>
            <strong>{msg.username || 'anon'}:</strong> {msg.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesBox;
