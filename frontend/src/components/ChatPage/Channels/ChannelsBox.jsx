// frontend/src/components/ChatPage/Channels/ChannelsBox.jsx
import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { openModal } from '../../../slices/modalSlice.js';
import { setCurrentChannelId } from '../../../slices/channelsSlice.js';

const ChannelsBox = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.items);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { t } = useTranslation();

  // id del canal cuyo menú está abierto (o null)
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleAddChannel = () => {
    dispatch(openModal({ type: 'addChannel' }));
  };

  const handleSelectChannel = (id) => {
    dispatch(setCurrentChannelId(id));
    setOpenMenuId(null);
  };

  const handleRemoveChannel = useCallback((id) => {
    dispatch(openModal({ type: 'removeChannel', channelId: id }));
    setOpenMenuId(null);
  }, [dispatch]);

  const handleRenameChannel = useCallback((id) => {
    dispatch(openModal({ type: 'renameChannel', channelId: id }));
    setOpenMenuId(null);
  }, [dispatch]);

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  // Cerrar menú si se hace click fuera (opcional pero ayuda en UX)
  React.useEffect(() => {
    const onDocClick = (e) => {
      // Cierra si hace click en algo que no sea nuestro menu button/list
      if (!e.target.closest?.('[data-channel-actions]')) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{t('channelsTitle')}</h2>
        <button type="button" onClick={handleAddChannel}>
          +
        </button>
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
              <span
                data-channel-actions
                style={{ position: 'relative', display: 'inline-block' }}
              >
                {/* Botón de gestión: el nombre accesible proviene del contenido (incluye texto oculto) */}
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={openMenuId === ch.id}
                  onClick={() => toggleMenu(ch.id)}
                >
                  {/* Ícono simple */}
                  ⋮
                  {/* Texto accesible que el test puede encontrar por nombre */}
                  <span className="visually-hidden">{t('modal.menu')}</span>
                </button>

                {openMenuId === ch.id && (
                  <ul
                    role="menu"
                    aria-label={t('modal.menu')}
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
                        onClick={() => handleRenameChannel(ch.id)}
                        style={{ display: 'block', width: '100%', textAlign: 'left' }}
                      >
                        {t('modal.rename')}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => handleRemoveChannel(ch.id)}
                        style={{ display: 'block', width: '100%', textAlign: 'left' }}
                      >
                        {t('modal.remove')}
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
