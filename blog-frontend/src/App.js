import React from 'react';
import { Route } from 'react-router-dom';
import PostListPage from './pages/PostListPage';
import ProfileListPage from './pages/ProfileListPage';
import TagsListPage from './pages/TagsListPage';
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
          <Route component={PostListPage} path='/' exact />
          <Route component={ProfileListPage} path='/@:nickname' exact />
          <Route component={TagsListPage} path='/tags/:tag' exact />
          <Route component={PostPage} path="/@:nickname/:postId" />
          <Route component={WritePage} path="/write" />
    </>
  )
}

export default App;
