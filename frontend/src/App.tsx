import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/layout/navbar';
import styled from '@emotion/styled';
import Landing from './pages/landing';

const { Content, Footer } = Layout;

// Placeholder components for routes
const Home = () => <div>Home Page</div>;
const About = () => <div>About Page</div>;
const Services = () => <div>Services Page</div>;
const Contact = () => <div>Contact Page</div>;

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

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout>
        <Navbar />
        <StyledContent>
          <SiteLayoutContent>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </SiteLayoutContent>
        </StyledContent>
        <StyledFooter>©2024 Chuwa Fullstack Training</StyledFooter>
      </AppLayout>
    </Router>
  );
};

export default App;
