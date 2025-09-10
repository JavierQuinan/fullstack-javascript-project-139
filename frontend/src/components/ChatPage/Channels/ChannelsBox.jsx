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

      {/* sin bullets */}
      <ul className="channels-list" style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
        {channels.map((ch) => (
          <li key={ch.id} style={{ margin: '6px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              onClick={() => handleSelectChannel(ch.id)}
              className={`channel-button${ch.id === currentChannelId ? ' is-active' : ''}`}
              aria-label={`channel ${ch.name}`}
            >
              <span className="channel-name">{ch.name}</span>
            </button>

            {ch.removable && (
              <span style={{ display: 'inline-flex', gap: 6 }}>
                {/* 👇 Hacemos que el test siempre encuentre estos controles */}
                <button
                  type="button"
                  aria-label="Rename"
                  data-testid="rename"
                  onClick={() => handleRenameChannel(ch.id)}
                >
                  Rename
                </button>

                <button
                  type="button"
                  aria-label="Remove"
                  data-testid="remove"
                  onClick={() => handleRemoveChannel(ch.id)}
                >
                  Remove
                </button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelsBox;
