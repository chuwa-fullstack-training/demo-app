import { RootState } from '@/app/store';
import { clearUser } from '@/features/user/userSlice';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, MenuProps } from 'antd';
import { CircleUser } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './navbar.css'; // !NOT recommended

const { Header } = Layout;

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { currentUser, isAuthenticated } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setVisible(!visible);
  };

  const menuItems: Required<MenuProps>['items'][number][] = [
    { key: 'home', label: 'Home', onClick: () => navigate('/') },
  ];

  if (isAuthenticated) {
    menuItems.push(
      { key: 'create-post', label: 'Create Post', onClick: () => navigate('/create-post') },
      {
        key: 'user',
        label: currentUser?.name ?? 'User',
        icon: <CircleUser size={20} />,
        children: [
          { key: 'profile', label: 'Profile', onClick: () => navigate('/profile') },
          { key: 'logout', label: 'Logout', onClick: () => dispatch(clearUser()) },
        ],
      },
    );
  } else {
    menuItems.push(
      { key: 'login', label: 'Log In', onClick: () => navigate('/login') },
      { key: 'signup', label: 'Sign Up', onClick: () => navigate('/signup') },
    );
  }

  return (
    <Header className="navbar">
      <div className="logo">
        <img src="/vite.svg" alt="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
      </div>
      <div className="navbar-menu">
        <div className="desktop-menu">
          <Menu theme="dark" mode="horizontal" items={menuItems} />
        </div>
        <div className="mobile-menu">
          <Button type="primary" onClick={toggleMenu} style={{ marginTop: 15, marginRight: 15 }}>
            <MenuOutlined />
          </Button>
          {visible && (
            <Menu
              theme="dark"
              mode="vertical"
              style={{ position: 'absolute', top: 64, right: 0, width: 200 }}
              items={menuItems}
            />
          )}
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
