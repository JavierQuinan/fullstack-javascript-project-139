import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../contexts/AuthProvider.jsx';
import { fetchInitialData } from '../../slices/thunks.js';
import { useSocket } from '../../contexts/SocketProvider.jsx';
import { messageReceived } from '../../slices/messagesSlice.js';
import { channelAdded, channelRemoved, channelRenamed } from '../../slices/channelsSlice.js';

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

  // Auth + bootstrap
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      dispatch(fetchInitialData());
    }
  }, [isAuthenticated, navigate, dispatch]);

  // Socket events
  useEffect(() => {
    if (!socket) return undefined;

    const handleNewMessage = (payload) => dispatch(messageReceived(payload));
    const handleNewChannel = (payload) => dispatch(channelAdded(payload));
    const handleRemoveChannel = (payload) => dispatch(channelRemoved(payload));
    const handleRenameChannel = (payload) => dispatch(channelRenamed(payload));

    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);
    socket.on('removeChannel', handleRemoveChannel);
    socket.on('renameChannel', handleRenameChannel);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('removeChannel', handleRemoveChannel);
      socket.off('renameChannel', handleRenameChannel);
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
