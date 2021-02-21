import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { listComments } from '../../modules/comments';
import CommentList from '../../components/comments/commentList'
import { readComment } from '../../modules/comment';
import { setOriginalComment } from '../../modules/writeComment';

const CommentListContainer = ({ match }) => {
    const dispatch = useDispatch();
    const { comments, commentsError, comment, commentError, writeComment, originalCommentId, loadingWriteComment, loadingPost, loadingComments, user } = useSelector(({ comments, comment, writeComment, loading, user }) => ({
            comments: comments.comments,
            commentsError: comments.error,
            comment: comment.comment,
            commentError: comment.error,
            writeComment: writeComment.comment,
            originalCommentId: writeComment.originalCommentId,
            loadingWriteComment: loading['write/WRITE_COMMENT'],
            loadingPost: loading['post/READ_POST'],
            loadingComments: loading['comments/LIST_COMMENTS'],
            user: user.user,
        })
    )
    const { postId } = match.params

    useEffect(() => {
        if (!loadingWriteComment) {
            dispatch(listComments(postId));
        }
    }, [dispatch, match.params, writeComment, loadingWriteComment])

    if (loadingPost) return null;

    // comment map으로 생성, 수정&삭제 버튼 세트로
    return (
        <CommentList
            loadingComments={loadingComments}
            comments={comments}
            commentsError={commentsError}
            comment={comment}
            commentError={commentError}
            originalCommentId={originalCommentId}
            user={user}
            postId={postId}
        />
    )
};

export default withRouter(CommentListContainer);

