import React from 'react';
import { Button, Form, Input,message } from 'antd';
import axios from 'axios';

type FieldType = {
  firstName?: string;
  lastName?: string;
  userName?: string;
  password?: string;
  role?: string; // Add role field to FieldType
};

interface SignupProps {
  onSubmit: (values: FieldType) => void; // Add onSubmit prop
  switchToLogin: () => void;
}

const SignupForm: React.FC<SignupProps> = ({ switchToLogin }) => {
  const onFinish = async (values: FieldType) => {
    try {
      // Set the role to "USER" before submitting
      const valuesWithRole = { ...values, role: "USER" };
      const response = await axios.post(import.meta.env.VITE_APP_BASE_URL + '/auth/register', valuesWithRole);
      console.log('Registration successful!', response.data);
      message.success('Registration successful');
     
    } catch (error) {
      console.error('Registration failed:', error);
      message.error('error registration')
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="wrap"
      labelCol={{ flex: '110px' }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 1 }}
      colon={false}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h1>Sign Up</h1>

      <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Username" name="userName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 0, span: 32}}>
        <Button type="primary"  htmlType="submit" style={{ width: '100%' }}>
          Sign Up
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
        <Button type="link" onClick={switchToLogin}>Back to Login</Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
