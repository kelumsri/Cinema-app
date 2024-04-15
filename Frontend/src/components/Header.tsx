import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../assets/logo.png';
import SearchFilm from "../components/SearchFilm"
import Profile from "../components/Userprofile/ProfileDropDown"

export const HeaderComponent: React.FC = () => {
  return (
    <Layout>
      <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
        {/* Wrap the image with a Link */}
        <Link to="/home">
          <img src={logo} alt="Logo" style={{ width: 80, height: 80, margin: '16px 24px 16px 0', float: 'left' }} />
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[]}
          style={{ flex: 1, minWidth: 0, justifyContent: 'flex-end' }}
        >
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', paddingTop: 0 }}>
            <SearchFilm/>
          </div>
          <div>
            <Profile/>
          </div>
        </Menu>
      </Layout.Header>
    </Layout>
  );                                    
};

export default HeaderComponent;
