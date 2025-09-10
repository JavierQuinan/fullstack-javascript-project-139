// frontend/src/components/ChatPage/Channels/ChannelsBox.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openModal } from '../../../slices/modalSlice.js';
import { setCurrentChannelId } from '../../../slices/channelsSlice.js';

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { t } = useTranslation();

  // qué canal tiene abierto el menú de gestión
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleAddChannel = () => {
    dispatch(openModal({ type: 'addChannel' }));
  };

  const handleSelectChannel = (id) => {
    dispatch(setCurrentChannelId(id));
  };

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleRemoveChannel = (id) => {
    setOpenMenuId(null);
    dispatch(openModal({ type: 'removeChannel', channelId: id }));
  };

  const handleRenameChannel = (id) => {
    setOpenMenuId(null);
    dispatch(openModal({ type: 'renameChannel', channelId: id }));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{t('channelsTitle') || 'Channels'}</h2>
        <button type="button" onClick={handleAddChannel} aria-label="Add channel">+</button>
      </div>

      <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
        {channels.map((ch) => {
          const isActive = ch.id === currentChannelId;
          return (
            <li key={ch.id} style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '6px 0' }}>
              {/* Botón para seleccionar canal */}
              <button
                type="button"
                onClick={() => handleSelectChannel(ch.id)}
                style={{
                  fontWeight: isActive ? 'bold' : 'normal',
                  padding: '6px 10px',
                  border: '1px solid #ccc',
                  borderRadius: 6,
                  background: isActive ? '#e9ecef' : '#fff',
                }}
              >
                #{' '}{ch.name}
              </button>

              {/* Botón de gestión esperado por los tests */}
              {ch.removable && (
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    aria-label="Channel management"
                    onClick={() => toggleMenu(ch.id)}
                    style={{ padding: '6px 10px' }}
                  >
                    ⋮
                  </button>

                  {/* Menú contextual simple */}
                  {openMenuId === ch.id && (
                    <div
                      role="menu"
                      style={{
                        position: 'absolute',
                        top: '110%',
                        left: 0,
                        background: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: 8,
                        boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                        padding: 6,
                        zIndex: 10,
                        minWidth: 120,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleRemoveChannel(ch.id)}
                        style={{ display: 'block', width: '100%', textAlign: 'left', padding: '6px 10px' }}
                      >
                        {t('modal.remove') || 'Remove'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRenameChannel(ch.id)}
                        style={{ display: 'block', width: '100%', textAlign: 'left', padding: '6px 10px' }}
                      >
                        {t('modal.rename') || 'Rename'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChannelsBox;
