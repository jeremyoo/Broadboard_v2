import React, { useEffect } from 'react';
import WriteCommentButtons from '../../components/writeComment/WriteCommentButtons';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { write_Comment, update_Comment, initializeComment } from '../../modules/writeComment';

const WriteCommentButtonContainer = ({ match, onCancelAdd }) => {
  const dispatch = useDispatch();
  const { body, commentId, user, loadingPost, loadingComments } = useSelector(({ writeComment, user, loading }) => ({
      body: writeComment.body,
      commentId: writeComment.originalCommentId,
      user: user.user,
      loadingPost: loading['post/READ_POST'],
      loadingComments: loading['comments/LIST_COMMENTS'],
    }),
  );
  
  const onPublish = () => {
    if (body === '' || !user) {
      return null;
    }
    const { postId } = match.params;
    if (commentId) {
      dispatch(update_Comment({ postId, commentId, body }));
    } else {
      dispatch(write_Comment({ body, postId }));
    }
    dispatch(initializeComment());
  };

  const onCancel = () => {
    dispatch(initializeComment());
  };

  if (loadingPost || loadingComments) return null;

  return (
    <WriteCommentButtons
      onPublish={onPublish}
      onCancel={onCancel}
      onCancelAdd={onCancelAdd}
      commentId={commentId}
    />
  );
};

export default withRouter(WriteCommentButtonContainer);
