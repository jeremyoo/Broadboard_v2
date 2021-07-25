import React, { useEffect } from 'react';
import WritePostButtons from '../../components/writePost/WritePostButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { write_Post, update_Post } from '../../modules/writePost';
import { unloadPosts } from '../../modules/posts';

const WritePostButtonsContainer = ({ history, onChangeConfirm }) => {
  const dispatch = useDispatch();
  const { title, banner, body, tags, post, error, originalPostId } = useSelector(
    ({ writePost }) => ({
      title: writePost.title,
      banner: writePost.banner,
      body: writePost.body,
      tags: writePost.tags,
      post: writePost.post,
      error: writePost.error,
      originalPostId: writePost.originalPostId,
    }),
  );

  const onPublish = () => {
    if (originalPostId) {
      dispatch(update_Post({ title, banner, body, tags, id: originalPostId }));
      return;
    }
    dispatch(write_Post({ title, banner, body, tags}));
    dispatch(unloadPosts());
  };

  useEffect(() => {
    if (post) {
      const { _id, user } = post;
      history.push(`/@${user.nickname}/${_id}`);
    }
    if (error) {
      console.log(error);
    }
  }, [history, post, error]);

  return (
    <WritePostButtons
      onPublish={onPublish}
      isEdit={!!originalPostId}
      onChangeConfirm={onChangeConfirm}
    />
  );
};

export default withRouter(WritePostButtonsContainer);
