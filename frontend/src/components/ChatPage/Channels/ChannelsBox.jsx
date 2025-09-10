// frontend/src/components/ChatPage/Channels/ChannelsBox.jsx
import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannelId } from '../../../slices/channelsSlice.js';
import { openModal } from '../../../slices/modalSlice.js';

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const [openMenuId, setOpenMenuId] = useState(null);

  const handleAddChannel = () => {
    dispatch(openModal({ type: 'addChannel' }));
  };

  const handleSelectChannel = (id) => {
    dispatch(setCurrentChannelId(id));
    setOpenMenuId(null);
  };

  const handleRemoveChannel = useCallback((ch) => {
    // Pasa id (y name opcionalmente) — el slice puede ignorar extras.
    dispatch(openModal({ type: 'removeChannel', channelId: ch.id, name: ch.name }));
    setOpenMenuId(null);
  }, [dispatch]);

  const handleRenameChannel = useCallback((ch) => {
    dispatch(openModal({ type: 'renameChannel', channelId: ch.id, name: ch.name }));
    setOpenMenuId(null);
  }, [dispatch]);

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Channels</h2>
        <button type="button" onClick={handleAddChannel}>+</button>
      </div>

      <ul>
        {channels.map((ch) => (
          <li key={ch.id} style={{ margin: '5px 0' }}>
            <button
              type="button"
              onClick={() => handleSelectChannel(ch.id)}
              style={{ fontWeight: ch.id === currentChannelId ? 'bold' : 'normal', marginRight: 8 }}
            >
              #{' '}{ch.name}
            </button>

            {ch.removable && (
              <span style={{ position: 'relative', display: 'inline-block' }}>
                {/* Botón de gestión CON nombre accesible EXACTO */}
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={openMenuId === ch.id}
                  aria-label="Channel management"
                  onClick={() => toggleMenu(ch.id)}
                >
                  ⋮
                </button>

                {openMenuId === ch.id && (
                  <ul
                    role="menu"
                    aria-label="Channel management"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: 4,
                      padding: 6,
                      listStyle: 'none',
                      border: '1px solid #ddd',
                      background: '#fff',
                      zIndex: 1000,
                      minWidth: 140,
                    }}
                  >
                    <li>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => handleRenameChannel(ch)}
                        style={{ display: 'block', width: '100%', textAlign: 'left' }}
                      >
                        Rename
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => handleRemoveChannel(ch)}
                        style={{ display: 'block', width: '100%', textAlign: 'left' }}
                      >
                        Remove
                      </button>
                    </li>
                  </ul>
                )}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelsBox;
