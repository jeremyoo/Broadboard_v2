import React from 'react';
import { Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import { Helmet } from 'react-helmet-async'
import { GlobalStyle } from './lib/styles';

const App = () => {

  return (
    <>
      <Helmet>
        <title>REACTERS</title>
      </Helmet>
        <GlobalStyle />
          <Route component={PostListPage} path={['/@:nickname', '/']} exact />
          <Route component={LoginPage} path="/login" />
          <Route component={RegisterPage} path="/register" />
          <Route component={WritePage} path="/write" />
          <Route component={PostPage} path="/@:nickname/:postId" />
    </>
  )
}

export default App;
