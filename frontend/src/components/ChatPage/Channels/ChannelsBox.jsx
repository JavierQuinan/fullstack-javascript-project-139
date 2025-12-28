// frontend/src/components/ChatPage/Channels/ChannelsBox.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openModal } from '../../../slices/modalSlice.js';
import { setCurrentChannelId } from '../../../slices/channelsSlice.js';
// import Channel from './Channel.jsx'; // <-- Se elimina, no se usa

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const { t } = useTranslation();

  const handleAddChannel = () => {
    dispatch(openModal({ type: 'addChannel' }));
  };

  const handleSelectChannel = (id) => {
    dispatch(setCurrentChannelId(id));
  };

  const handleRemoveChannel = (id) => {
    dispatch(openModal({ type: 'removeChannel', channelId: id }));
  };

  const handleRenameChannel = (id) => {
    dispatch(openModal({ type: 'renameChannel', channelId: id }));
  };

  return (
    <div className="channels-box">
      <div className="channels-header">
        <h5 className="mb-0">{t('channelsTitle')}</h5>
        <button 
          type="button" 
          className="btn-add-channel" 
          onClick={handleAddChannel}
          title={t('modal.add')}
        >
          +
        </button>
      </div>
      <ul className="channels-list">
        {channels.map((ch) => (
          <li 
            key={ch.id} 
            className={`channel-item ${ch.id === currentChannelId ? 'active' : ''}`}
          >
            <button
              type="button"
              onClick={() => handleSelectChannel(ch.id)}
              className="channel-button"
            >
              <span className="channel-hash">#</span>
              {ch.name}
            </button>
            {ch.removable && (
              <div className="channel-actions">
                <button 
                  type="button" 
                  onClick={() => handleRenameChannel(ch.id)}
                  className="btn-action"
                  title={t('modal.rename')}
                >
                  Edit
                </button>
                <button 
                  type="button" 
                  onClick={() => handleRemoveChannel(ch.id)}
                  className="btn-action btn-danger"
                  title={t('modal.remove')}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelsBox;
