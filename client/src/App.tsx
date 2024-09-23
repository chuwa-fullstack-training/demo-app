import GlobalMessage from '@/components/GlobalMessage';
import Navbar from '@/components/layout/navbar';
import Login from '@/pages/auth/login';
import Signup from '@/pages/auth/signup';
import Landing from '@/pages/landing';
import styled from '@emotion/styled';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from 'antd';
import 'moment-timezone';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AllPosts from './pages/post/allPosts';
import CreatePost from './pages/post/createPost';
import PostDetail from './pages/post/detail';
import Profile from './pages/profile';
import CreateProfile from './pages/profile/createProfile';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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
  overflow-y: auto;
  height: calc(100vh - 134px);
`;

const StyledFooter = styled(Footer)`
  text-align: center;
`;

const queryClient = new QueryClient();

// Create an HTTP link
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Create an auth link
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  };
});

// Create the Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
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
                    <Route path="/posts" element={<AllPosts />} />
                    <Route path="/posts/:id" element={<PostDetail />} />
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/create-profile" element={<CreateProfile />} />
                  </Route>
                </Routes>
              </SiteLayoutContent>
            </StyledContent>
            <StyledFooter>©2024 Chuwa Fullstack Training</StyledFooter>
          </AppLayout>
        </Router>
      </QueryClientProvider>
    </ApolloProvider>
  );
};

export default App;
