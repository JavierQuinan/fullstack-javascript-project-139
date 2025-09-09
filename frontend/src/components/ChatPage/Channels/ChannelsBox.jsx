// frontend/src/components/ChatPage/Channels/ChannelsBox.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../../slices/modalSlice.js';
import { setCurrentChannelId } from '../../../slices/channelsSlice.js';

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const handleAddChannel = () => dispatch(openModal({ type: 'addChannel' }));
  const handleSelectChannel = (id) => dispatch(setCurrentChannelId(id));
  const handleRemoveChannel = (id) => dispatch(openModal({ type: 'removeChannel', channelId: id }));
  const handleRenameChannel = (id) => dispatch(openModal({ type: 'renameChannel', channelId: id }));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Channels</h2>
        <button type="button" onClick={handleAddChannel} aria-label="Add channel">+</button>
      </div>

      {/* 👇 sin bullets */}
      <ul className="channels-list">
        {channels.map((ch) => (
          <li key={ch.id} style={{ margin: '5px 0' }}>
            <button
              type="button"
              className={`channel-button${ch.id === currentChannelId ? ' is-active' : ''}`}
              onClick={() => handleSelectChannel(ch.id)}
              aria-label={`channel ${ch.name}`}
            >
              <span className="channel-name">{ch.name}</span>
            </button>

            {ch.removable && (
              <span style={{ marginLeft: 10 }}>
                <button type="button" onClick={() => handleRemoveChannel(ch.id)}>Remove</button>
                <button type="button" onClick={() => handleRenameChannel(ch.id)}>Rename</button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelsBox;
