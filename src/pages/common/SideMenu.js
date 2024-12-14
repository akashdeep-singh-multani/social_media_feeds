import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { label: 'Feed', route: '/user_post' },
    { label: 'Profile', route: '/edit_user_profile' },
  ];

  const handleMenuItemClick = (route) => {
    navigate(route);
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            backgroundColor: '#2c3e50',
            color: 'white',
          },
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button // Correct usage of the boolean `button` prop
              key={index}
              onClick={() => handleMenuItemClick(item.route)}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default SideMenu;
