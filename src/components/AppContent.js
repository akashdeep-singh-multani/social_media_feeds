import React from 'react';
import { useUser } from '../hooks/useUser';
import SideMenu from '../pages/common/SideMenu';
import ToastNotifications from '../pages/toast/ToastNotifications';
import RouterConfig from '../RouterConfig';

const AppContent = () => {
  const { user } = useUser();
  console.log('user in AppContent: ' + JSON.stringify(user));
  return (
    <div>
      {user && <SideMenu />}
      <ToastNotifications />
      <RouterConfig />
    </div>
  );
};

export default AppContent;
