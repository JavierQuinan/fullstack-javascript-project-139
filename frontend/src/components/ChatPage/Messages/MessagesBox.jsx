// frontend/src/components/ChatPage/Messages/MessagesBox.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import Message from './Message.jsx';

const MessagesBox = () => {
  const messagesState = useSelector((s) => s.messages);
  const currentChannelId = useSelector((s) => s.channels.currentChannelId);

  const all = messagesState?.items || [];
  const visible = currentChannelId == null
    ? all
    : all.filter((m) => m.channelId === currentChannelId);

  return (
    <div>
      <ul className="list-unstyled m-0">
        {visible.map((m) => (
          <Message
            key={m.id ?? `${m.channelId}-${m.createdAt}-${m.username ?? 'anon'}-${m.body}`}
            message={m}
          />
        ))}
      </ul>
    </div>
  );
};

export default MessagesBox;
