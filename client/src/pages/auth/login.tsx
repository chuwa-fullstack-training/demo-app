import React from 'react';
import { message, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import AuthForm from '@/components/auth/form';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        isAdmin
      }
    }
  }
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN_MUTATION);

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const { data } = await login({ variables: values });
      localStorage.setItem('token', data.login.token);
      localStorage.setItem('user', JSON.stringify(data.login.user));
      message.success('Login successful');
      navigate('/profile');
    } catch (error: any) {
      message.error('Login failed: ' + (error.message || 'An unexpected error occurred'));
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
