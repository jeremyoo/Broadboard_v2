import React from 'react';
import Responsive from '../components/common/Responsive';
import WriteContainer from '../containers/writePost/WriteContainer';
import { Helmet } from 'react-helmet-async';

const WritePage = () => {
  return (
    <Responsive>
      <Helmet>
        <title>Write post</title>
      </Helmet>
      <WriteContainer />
    </Responsive>
  );
};

export default WritePage;
