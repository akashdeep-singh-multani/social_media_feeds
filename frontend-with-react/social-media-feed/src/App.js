import './App.css';
import React from 'react';
import { UserProvider } from './contexts/UserContext';
import ToastNotifications from './pages/toast/ToastNotifications';
import RouterConfig from './RouterConfig';

function App() {
  return (
    <UserProvider>
      <ToastNotifications />
      <RouterConfig />
    </UserProvider>
  );
}

export default App;
