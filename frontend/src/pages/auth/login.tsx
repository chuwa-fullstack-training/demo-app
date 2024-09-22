import { login } from '@/api/auth';
import AuthForm from '@/components/auth/form';
import { setMessage } from '@/features/message/messageSlice';
import { Card } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      await login(values);
      dispatch(
        setMessage({
          type: 'success',
          content: 'Login successful!',
        }),
      );
      navigate('/');
    } catch (error: unknown) {
      dispatch(
        setMessage({
          type: 'error',
          content: `Login failed: ${error instanceof Error ? error.message : 'Please try again.'}`,
        }),
      );
    }
  };

  const fields = [
    {
      name: 'email',
      label: 'Email',
      rules: [
        { type: 'email' as const, message: 'Please enter a valid email' },
        { required: true, message: 'Please input your email' },
      ],
      inputType: 'email' as const,
    },
    {
      name: 'password',
      label: 'Password',
      rules: [{ required: true, message: 'Please input your password' }],
      inputType: 'password' as const,
    },
  ];

  return (
    <Card className={styles.card}>
      <AuthForm title="Log In" fields={fields} onFinish={onFinish} submitButtonText="Log In" />
      <p className="text-center text-sm text-neutral-700">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </Card>
  );
};

export default Login;
