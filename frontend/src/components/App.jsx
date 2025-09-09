// frontend/src/components/App.jsx
import React, { useEffect } from 'react';
import '../App.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppRoutes from '../routes.js';
import ChatNavbar from './Navbar/ChatNavbar.jsx';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from 'react-redux';
import { getData } from '../chatApi/api.js';
import { setChannels, setCurrentChannelId } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { channels, messages, currentChannelId } = await getData();
        dispatch(setChannels(channels));
        dispatch(setMessages(messages));
        dispatch(setCurrentChannelId(currentChannelId));
      } catch {
        // opcional: toast/log
      }
    })();
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <ChatNavbar />
        <ToastContainer />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
