import { JwtPayload, KnownError } from '@/app/types';
import AuthForm from '@/components/auth/form';
import { setMessage } from '@/features/message/messageSlice';
import { setUser, loginUser } from '@/features/user/userSlice';
import { Card } from 'antd';
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { unwrapResult } from '@reduxjs/toolkit';
import { AppDispatch } from '@/app/store';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const result = await dispatch(loginUser(values));
      const { message, token } = unwrapResult(result);
      const decodedToken = jwtDecode<JwtPayload>(token);
      dispatch(setUser(decodedToken.user));
      dispatch(
        setMessage({
          type: 'success',
          content: message,
        }),
      );
      navigate('/');
    } catch (err: unknown) {
      const error = err as KnownError;
      dispatch(
        setMessage({
          type: 'error',
          content: `Login failed: ${error.message ? error.message : 'Please try again.'}`,
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
