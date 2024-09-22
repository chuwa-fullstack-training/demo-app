import styled from '@emotion/styled';
import { Button, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

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
  return (
    <LandingContainer>
      <Title level={2} style={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        Welcome to Chuwa Fullstack Training
      </Title>
      <ButtonContainer>
        <StyledButton type="primary" size="large">
          <Link to="/signup">Sign Up</Link>
        </StyledButton>
        <StyledButton size="large">
          <Link to="/login">Log In</Link>
        </StyledButton>
      </ButtonContainer>
    </LandingContainer>
  );
};

export default Landing;
