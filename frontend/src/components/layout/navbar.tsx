import React, { useState } from 'react';
import { Layout, Menu, Button, MenuProps } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import './navbar.css';
import { clearUser } from '@/features/user/userSlice';
import { CircleUser } from 'lucide-react';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setVisible(!visible);
  };

  const menuItems: Required<MenuProps>['items'][number][] = [
    { key: 'home', label: 'Home', onClick: () => navigate('/') },
  ];

  if (isAuthenticated) {
    menuItems.push({
      key: 'user',
      label: 'User',
      icon: <CircleUser size={20} />,
      children: [
        { key: 'profile', label: 'Profile', onClick: () => navigate('/profile') },
        { key: 'logout', label: 'Logout', onClick: () => dispatch(clearUser()) },
      ],
    });
  } else {
    menuItems.push(
      { key: 'login', label: 'Login', onClick: () => navigate('/login') },
      { key: 'sign-up', label: 'Sign Up', onClick: () => navigate('/signup') },
    );
  }

  return (
    <Header className="navbar">
      <div className="logo">
        <img src="/vite.svg" alt="logo" />
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
