import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost, likePost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import PostActionButtons from '../../components/post/PostActionButtons';
import { setOriginalPost } from '../../modules/writePost';
import { removePost } from '../../lib/api/posts';

const PostViewerContainer = ({ match, history }) => {
  
  const { postId } = match.params;
  const dispatch = useDispatch();
  const { post, error, loading, user } = useSelector(
    ({ post, loading, user }) => ({
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      user: user.user,
    }),
  );

  useEffect(() => {
    dispatch(readPost(postId));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    history.push('/write');
  };

  const onRemove = async () => {
    try {
      await removePost(postId);
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  const onLike = useCallback(() => {
    if (user && postId) {
      const id = postId;
      const userId = user._id;
      dispatch(likePost({ id, userId }));
    }
    return;
  });

  const onAddCmt = useCallback(() => {
    if (post && !loading) {
      if (!document.getElementById("addCmtBtn")) {
        const addNewCmt = document.getElementById("cmtEditor");
        const addNewCmtHeight = addNewCmt.offsetTop;
        window.scrollTo(0, addNewCmtHeight);
        return;
      }
      const addCmt = document.getElementById("addCmtBtn");
      const addCmtHeight = addCmt.offsetTop;
      window.scrollTo(0, addCmtHeight);
      addCmt.click();
      return;
    };
  });
  

  const ownPost = (user && user._id) === (post && post.user._id);

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      onLike={onLike}
      onAddCmt={onAddCmt}
      actionButtons={
        ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />
      }
    />
  );
};

export default withRouter(PostViewerContainer);
