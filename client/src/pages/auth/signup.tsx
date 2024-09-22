import AuthForm from '@/components/auth/form';
import { Card } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { signup } from '@/api/auth';
import { useDispatch } from 'react-redux';
import { setMessage } from '@/features/message/messageSlice';

const SignUp: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: { name: string; email: string; password: string }) => {
    try {
      await signup(values);
      dispatch(
        setMessage({
          type: 'success',
          content: 'Signup successful!',
        }),
      );
      navigate('/login');
    } catch (error: unknown) {
      dispatch(
        setMessage({
          type: 'error',
          content: `Signup failed: ${error instanceof Error ? error.message : 'Please try again.'}`,
        }),
      );
    }
  };

  const fields = [
    {
      name: 'name',
      label: 'Your name',
      rules: [{ required: true, message: 'Please input your name' }],
      inputType: 'text' as const,
    },
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
      rules: [
        { required: true, message: 'Please input your password' },
        { min: 8, message: 'Password must be at least 8 characters' },
        {
          pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
          message: 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number',
        },
      ],
      inputType: 'password' as const,
    },
  ];

  return (
    <Card className={styles.card}>
      <AuthForm title="Sign Up" fields={fields} onFinish={onFinish} submitButtonText="Create Account" />
      <p className="text-center text-sm text-neutral-700">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </Card>
  );
};

export default SignUp;
