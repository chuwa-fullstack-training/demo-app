import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import styled from '@emotion/styled';

const { Title } = Typography;

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 248px); // Subtracting 64px for header and 64px for footer
  padding: 20px;
`;

const StyledForm = styled(Form)`
  width: 300px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
`;

interface LoginValues {
  username: string;
  password: string;
}

const Landing: React.FC = () => {
  const onFinish = (values: LoginValues) => {
    console.log('Success:', values);
    // Handle login logic here
  };

  return (
    <LandingContainer>
      <StyledForm name="login" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log in
          </Button>
        </Form.Item>
      </StyledForm>
    </LandingContainer>
  );
};

export default Landing;
