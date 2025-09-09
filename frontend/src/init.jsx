// frontend/src/init.jsx
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import { Provider as RollbarProvider, ErrorBoundary as RollbarErrorBoundary } from '@rollbar/react';

import store from './slices/index.js';
import AuthProvider from './contexts/AuthProvider.jsx';
import SocketProvider from './contexts/SocketProvider.jsx';
import resources from './locales/index.js';
import App from './components/App.jsx';

// Config de Rollbar
const rollbarConfig = {
  accessToken: '48593c211cdc43cf925df784e3768c13',
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const isProd = process.env.NODE_ENV === 'production';

export default async function init() {
  i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    resources,
  });

  const CoreTree = (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <SocketProvider>
              <App />
            </SocketProvider>
          </AuthProvider>
        </I18nextProvider>
      </ReduxProvider>
    </React.StrictMode>
  );

  // En CI/dev no montamos Rollbar para evitar ruidos/timeouts.
  if (!isProd) return CoreTree;

  return (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <I18nextProvider i18n={i18n}>
          <RollbarProvider config={rollbarConfig}>
            <RollbarErrorBoundary>
              <AuthProvider>
                <SocketProvider>
                  <App />
                </SocketProvider>
              </AuthProvider>
            </RollbarErrorBoundary>
          </RollbarProvider>
        </I18nextProvider>
      </ReduxProvider>
    </React.StrictMode>
  );
}
