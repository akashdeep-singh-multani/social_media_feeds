import './App.css';
import React from 'react';
import { UserProvider } from './contexts/UserContext';
import ToastNotifications from './pages/toast/ToastNotifications';
import RouterConfig from './RouterConfig';
import SideMenu from './pages/common/SideMenu';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsTokenAvailable } from './store/selectors/authSelectors';

function App() {
  const token = useSelector(selectIsTokenAvailable);

  return (
    <UserProvider>
      <Router>
        {token && <SideMenu />}
        <ToastNotifications />
        <RouterConfig />
      </Router>
    </UserProvider>
  );
}

export default App;
