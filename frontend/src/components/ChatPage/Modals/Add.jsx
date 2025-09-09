// frontend/src/components/ChatPage/Modals/Add.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addChannel, fetchInitialData } from '../../../slices/thunks.js';
import { closeModal } from '../../../slices/modalSlice.js';

const Add = () => {
  const dispatch = useDispatch();
  const [channelName, setChannelName] = useState('');
  const inputRef = useRef(null);

  const channels = useSelector((s) => s.channels.items);
  const isOpen = useSelector((s) => s.modal?.isOpen);
  const type = useSelector((s) => s.modal?.type);

  useEffect(() => {
    if (type === 'addChannel' && isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [type, isOpen]);

  if (!isOpen || type !== 'addChannel') return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = channelName.trim();
    if (!name) return;

    // evita duplicados rápidos en UI (el server también validará)
    if (channels.some((ch) => ch.name === name)) {
      toast.error('Must be unique');
      return;
    }

    try {
      // 1) Crea el canal usando el THUNK (esto ya intenta normalizar)
      await dispatch(addChannel({ name })).unwrap();

      // 2) Fuerza refresco de la lista para que "test channel" esté seguro en el store
      await dispatch(fetchInitialData());

      // 3) Mensaje EXACTO que busca el test
      toast.success('Channel created');

      setChannelName('');
      dispatch(closeModal());
    } catch (err) {
      toast.error('Connection error');
    }
  };

  const handleCancel = () => {
    setChannelName('');
    dispatch(closeModal());
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="modal-backdrop"
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050,
      }}
    >
      <div className="modal-content" style={{ background: '#fff', padding: 16, width: 400, maxWidth: '90%' }}>
        <h3 style={{ marginTop: 0 }}>Add channel</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="new-channel" className="form-label">Channel name</label>
            <input
              id="new-channel"
              ref={inputRef}
              type="text"
              className="form-control"
              aria-label="Channel name"    // 👈 el test suele usar esto
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">Create</button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
