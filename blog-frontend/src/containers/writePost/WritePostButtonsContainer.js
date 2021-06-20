import React, { useEffect } from 'react';
import WritePostButtons from '../../components/writePost/WritePostButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { write_Post, update_Post } from '../../modules/writePost';
import { unloadPosts } from '../../modules/posts';

const WritePostButtonsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const { title, body, tags, post, postError, originalPostId } = useSelector(
    ({ writePost }) => ({
      title: writePost.title,
      body: writePost.body,
      tags: writePost.tags,
      post: writePost.post,
      postError: writePost.postError,
      originalPostId: writePost.originalPostId,
    }),
  );

  const onPublish = () => {
    if (originalPostId) {
      dispatch(update_Post({ title, body, tags, id: originalPostId }));
      return;
    }
    dispatch(write_Post({ title, body, tags}));
    dispatch(unloadPosts());
  };

  const onCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      history.push(`/@${user.nickname}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [history, post, postError]);

  return (
    <WritePostButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!originalPostId}
    />
  );
};

export default withRouter(WritePostButtonsContainer);
