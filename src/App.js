import './App.css';
import React from 'react';
import { UserProvider } from './contexts/UserContext';
import ToastNotifications from './pages/toast/ToastNotifications';
import RouterConfig from './RouterConfig';
import SideMenu from './pages/common/SideMenu';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <UserProvider>
      <Router>
        <SideMenu />
        <ToastNotifications />
        <RouterConfig />
      </Router>
    </UserProvider>
  );
}

export default App;
