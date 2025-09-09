// frontend/src/components/ChatPage/ChatPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../contexts/AuthProvider.jsx';
import { fetchInitialData } from '../../slices/thunks.js';
import { useSocket } from '../../contexts/SocketProvider.jsx';
import { messageReceived } from '../../slices/messagesSlice.js';
import {
  channelAdded,
  channelRemoved,
  channelRenamed,
} from '../../slices/channelsSlice.js';
import ChannelsBox from './Channels/ChannelsBox.jsx';
import MessagesBox from './Messages/MessagesBox.jsx';
import MessageForm from './Messages/MessageForm.jsx';
import Add from './Modals/Add.jsx';
import Remove from './Modals/Remove.jsx';
import Rename from './Modals/Rename.jsx';
import ChatNavbar from '../Navbar/ChatNavbar.jsx';

const ChatPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();

  // Redirección + carga inicial
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      dispatch(fetchInitialData());
    }
  }, [isAuthenticated, navigate, dispatch]);

  // Suscripciones de socket -> store
  useEffect(() => {
    if (!socket) return undefined;

    const onNewMessage = (payload) => dispatch(messageReceived(payload));
    const onNewChannel = (payload) => dispatch(channelAdded(payload));
    const onRemoveChannel = (payload) => dispatch(channelRemoved(payload));
    const onRenameChannel = (payload) => dispatch(channelRenamed(payload));

    socket.on('newMessage', onNewMessage);
    socket.on('newChannel', onNewChannel);
    socket.on('removeChannel', onRemoveChannel);
    socket.on('renameChannel', onRenameChannel);

    return () => {
      socket.off('newMessage', onNewMessage);
      socket.off('newChannel', onNewChannel);
      socket.off('removeChannel', onRemoveChannel);
      socket.off('renameChannel', onRenameChannel);
    };
  }, [socket, dispatch]);

  return (
    <>
      <ChatNavbar />
      <div style={{ display: 'flex', height: '100vh' }}>
        <div
          style={{
            width: '250px',
            borderRight: '1px solid #ccc',
            padding: '1rem',
            overflowY: 'auto',
          }}
        >
          <ChannelsBox />
        </div>
        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
          <MessagesBox />
          <MessageForm />
        </div>
        <Add />
        <Remove />
        <Rename />
      </div>
    </>
  );
};

export default ChatPage;
