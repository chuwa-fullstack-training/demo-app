import GlobalMessage from '@/components/GlobalMessage';
import Navbar from '@/components/layout/navbar';
import Login from '@/pages/auth/login';
import Signup from '@/pages/auth/signup';
import Landing from '@/pages/landing';
import styled from '@emotion/styled';
import { Layout } from 'antd';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AllPosts from './pages/post/allPosts';

const { Content, Footer } = Layout;

const AppLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledContent = styled(Content)`
  padding: 0 50px;
  background-image: url('/landing.jpg');
  background-size: cover;
`;

const SiteLayoutContent = styled.div`
  padding: 24px;
  min-height: 380px;
`;

const StyledFooter = styled(Footer)`
  text-align: center;
`;

const Dashboard = () => {
  return <div>Dashboard</div>;
};

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout>
        <GlobalMessage />
        <Navbar />
        <StyledContent>
          <SiteLayoutContent>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/posts" element={<AllPosts />} />
              </Route>
            </Routes>
          </SiteLayoutContent>
        </StyledContent>
        <StyledFooter>©2024 Chuwa Fullstack Training</StyledFooter>
      </AppLayout>
    </Router>
  );
};

export default App;
