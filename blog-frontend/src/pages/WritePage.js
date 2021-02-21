import React from 'react';
import TagBoxContainer from '../containers/writePost/TagBoxContainer';
import WritePostButtonsContainer from '../containers/writePost/WritePostButtonsContainer';
import Responsive from '../components/common/Responsive';
import PostEditorContainer from '../containers/writePost/PostEditorContainer';
import { Helmet } from 'react-helmet-async';

const WritePage = () => {
  return (
    <Responsive>
      <Helmet>
        <title>Write post</title>
      </Helmet>
      <PostEditorContainer />
      <TagBoxContainer />
      <WritePostButtonsContainer />
    </Responsive>
  );
};

export default WritePage;
