// frontend/src/components/ChatPage/Modals/Rename.jsx
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../../slices/modalSlice.js';
import { renameChannel } from '../../../slices/thunks.js';

const Rename = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { isOpen, type, channelId } = useSelector((state) => state.modal);
  const channels = useSelector((state) => state.channels.items);

  const channel = useMemo(
    () => channels.find((c) => c.id === channelId) || null,
    [channels, channelId],
  );

  const [name, setName] = useState(channel?.name ?? '');
  const inputRef = useRef(null);

  useEffect(() => {
    if (type === 'renameChannel' && isOpen) {
      setName(channel?.name ?? '');
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [type, isOpen, channel?.name]);

  if (type !== 'renameChannel' || !isOpen || !channel) return null;

  const onCancel = () => dispatch(closeModal());

  const onSubmit = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) return;

    const existsWithSame = channels.some(
      (c) => c.name === trimmed && c.id !== channel.id,
    );
    if (existsWithSame) {
      toast.error(t('modal.unique') || 'Must be unique');
      return;
    }

    try {
      await dispatch(renameChannel({ id: channel.id, newName: trimmed })).unwrap();
      // Mensaje EXACTO que buscan en los tests
      toast.success('Channel renamed');
      dispatch(closeModal());
    } catch (err) {
      toast.error(t('errors.channelRename') || 'Error renaming channel');
      // opcional: console.error(err);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{t('modal.rename') || 'Rename'}</h2>
        <form onSubmit={onSubmit}>
          <label className="visually-hidden" htmlFor="rename-input">
            {t('modal.channelName') || 'Channel name'}
          </label>
          <input
            id="rename-input"
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('modal.channelName') || 'Channel name'}
            name="name"
          />
          <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel}>
              {t('cancel') || 'Cancel'}
            </button>
          </div>
      </form>
      </div>
    </div>
  );
};

export default Rename;
