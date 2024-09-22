import { RootState } from '@/app/store';
import styled from '@emotion/styled';
import { Button, Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const { Title } = Typography;

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 248px); // Subtracting 64px for header and 64px for footer
  padding: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
  width: 120px;
`;

const Landing: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/posts" />;
  }

  return (
    <LandingContainer>
      <Title level={2} style={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        Welcome to Chuwa Fullstack Training
      </Title>
      <ButtonContainer>
        <StyledButton type="primary" size="large" href="/signup">
          Sign Up
        </StyledButton>
        <StyledButton size="large" href="/login">
          Log In
        </StyledButton>
      </ButtonContainer>
    </LandingContainer>
  );
};

export default Landing;
