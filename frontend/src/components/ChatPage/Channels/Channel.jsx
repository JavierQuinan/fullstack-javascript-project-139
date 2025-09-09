// frontend/src/components/ChatPage/Channels/Channel.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChannelId } from '../../../slices/channelsSlice.js';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((s) => s.channels.currentChannelId);
  const active = currentChannelId === channel.id;

  return (
    <li className="mb-2">
      <button
        type="button"
        // El texto visible debe contener EXACTO el nombre del canal (p.ej. "random")
        className={`btn ${active ? 'btn-primary' : 'btn-outline-primary'} w-100 text-start`}
        onClick={() => dispatch(setCurrentChannelId(channel.id))}
      >
        {channel.name}
      </button>
    </li>
  );
};

export default Channel;
