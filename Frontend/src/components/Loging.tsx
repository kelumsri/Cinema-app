
import React from 'react';
import { Button, Checkbox, Form, Input,message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected import statement
import Cookies from 'js-cookie';

type FieldType = {
  userName?: string;
  password?: string;
  remember?: boolean;
};

interface LoginProps {
  onSubmit: (values: FieldType) => void;
  switchToSignUp: () => void;
}

const LoginForm: React.FC<LoginProps> = ({ switchToSignUp }) => {



  const navigate = useNavigate();

  const onFinish = async (values: FieldType) => {
    try {
      const response = await axios.post(import.meta.env.VITE_APP_BASE_URL + '/auth/login', values);

      
      console.log('Login successful!', response.data);
      const decoded: any = jwtDecode(response.data.token);
    
      // Save user role in cookies
      Cookies.set('token', response.data.token);
      Cookies.set('userRole', decoded.role);
      Cookies.set('userId', decoded.userId);
      
      
      setTimeout(() => {
        if (decoded && decoded.role === "USER") {
          console.log("Current User Role: USER");
          navigate("/home");
        } else if (decoded && decoded.role === "ADMIN") {
          console.log("Current User Role: ADMIN");
          navigate("/admin");
        } else {
          console.log("Unknown User Role");
          // Redirect or handle unauthorized access here
        }
      }, 100);
      // if (decoded && decoded.role === "USER") {
      //   console.log("Current User Role: USER");
      //   navigate("/home");
      // } else if (decoded && decoded.role === "ADMIN") {
      //   console.log("Current User Role: ADMIN");
      //   navigate("/admin");
      // } else {
      //   console.log("Unknown User Role");
      //   // Redirect or handle unauthorized access here
      // }
      
    } catch (error) {
      console.error('Login failed:', error);
      message.error('Login failed');
      // Handle login error here
    }
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h1>Login</h1>

      <Form.Item
        label="Username"
        name="userName"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Login
        </Button>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="link" onClick={switchToSignUp}>Create New Account</Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
