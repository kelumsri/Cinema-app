import React, { useState, useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Dropdown, message, Space, Modal, Form, Input } from 'antd';
import axios from 'axios';
import type { MenuProps } from 'antd';

const { Item } = Form;

const ProfileDropDown: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
  });

  useEffect(() => {
    const retrieveUserIdFromCookie = () => {
      const cookies = document.cookie.split(';');
      const userIdCookie = cookies.find(cookie => cookie.trim().startsWith('userId='));

      if (userIdCookie) {
        const userIdValue = userIdCookie.trim().split('=')[1];
        setUserId(userIdValue);
      } else {
        console.warn('User ID cookie not found.');
      }
    };

    retrieveUserIdFromCookie();
  }, []);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '1') {
      setIsModalVisible(true);
    } else if (e.key === '2') {
      // Redirect to "/summary"
      window.location.href = "/summary";
    } else if (e.key === '3') {
      // Clear cookies and local storage
      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });
      localStorage.clear();
      // Redirect to "/"
      window.location.href = "/";
    } 
    
  };

  const handleOk = () => {
    axios.put(`${import.meta.env.VITE_APP_BASE_URL}/api/users/${userId}`, profileData)
      .then(response => {
        console.log('PUT request successful', response);
        setIsModalVisible(false);
        message.success('Profile updated successfully');
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        message.error('Failed to update profile. Please try again later.');
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const items: MenuProps['items'] = [
    {
      label: 'Edit Profile',
      key: '1',
    },
    {
      label: 'My Booking',
      key: '2',
    },
    {
      label: 'LogOut',
      key: '3',
    },
    
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Space wrap>
      <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
        My Profile
      </Dropdown.Button>
      <Modal
        title="Edit Profile"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Item label="First Name" name="firstName">
            <Input name="firstName" onChange={handleInputChange} />
          </Item>
          <Item label="Last Name" name="lastName">
            <Input name="lastName" onChange={handleInputChange} />
          </Item>
          <Item label="Username" name="userName">
            <Input name="userName" onChange={handleInputChange} />
          </Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default ProfileDropDown;
 