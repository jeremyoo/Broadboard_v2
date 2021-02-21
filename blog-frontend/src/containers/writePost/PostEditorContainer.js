import React, { useEffect, useCallback } from 'react';
import PostEditor from '../../components/writePost/PostEditor';
import { useSelector, useDispatch } from 'react-redux';
import { changePostField, initializePost } from '../../modules/writePost';

const PostEditorContainer = () => {
  const dispatch = useDispatch();
  const { title, body } = useSelector(({ writePost }) => ({
    title: writePost.title,
    body: writePost.body,
  }));
  const onChangePost = useCallback(
    (payload) => dispatch(changePostField(payload)),
    [dispatch],
);
  useEffect(() => {
    return () => {
      dispatch(initializePost());
    };
  }, [dispatch]);

  return <PostEditor onChangePost={onChangePost} title={title} body={body} />;
};

export default PostEditorContainer;
