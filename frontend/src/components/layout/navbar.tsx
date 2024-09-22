import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './navbar.css';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => {
    setVisible(!visible);
  };

  const menuItems = [
    { key: '1', label: 'Home' },
    { key: '2', label: 'About' },
    { key: '3', label: 'Services' },
    { key: '4', label: 'Contact' },
  ];

  return (
    <Header style={{ padding: 0 }}>
      <div className="logo" style={{ float: 'left', width: 120, height: 31, margin: '16px 24px 16px 0' }} />
      <div className="navbar-menu" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div className="desktop-menu">
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={menuItems} />
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
