import React from 'react';
import { withRouter } from 'react-router-dom';
import Responsive from '../common/Responsive'
import Button from '../common/Button'
import palette from '../../lib/styles/palette';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { update_Comment, setOriginalComment } from '../../modules/writeComment';
import CommentEditorContainer from '../../containers/writeComment/CommentEditorContainer'
import WriteCommentButtonContainer from '../../containers/writeComment/WriteCommentButtonContainer'
import { removeComment } from '../../lib/api/comments'

const CommentListBlock = styled(Responsive)`
    padding-top: 2rem;
`;

const CommentItemBlock = styled.div`
    padding: 1rem 0;
    h3 {
        color: ${palette.gray[7]};
    };
    h5 {
        color: ${palette.gray[5]};
    }
    .content {
        padding: 0.5rem;
    }
`;

const CommentItem = ({ comment, originalCommentId, loggedInUser, postId, history }) => {
    const { publishedDate, user, body } = comment;
    const commentId = comment._id;
    const dispatch = useDispatch();
    const onEdit = () => dispatch(setOriginalComment(comment));
    const onUpdate = () => dispatch(update_Comment({ postId, commentId, body }));
    const onDelete = async () => {
        await removeComment({ postId, commentId });
        history.push(`${history.location.pathname}`)
    };
    return (
        <CommentItemBlock>
            <h3>{user.nickname}</h3>
            <h5>{new Date(publishedDate).toLocaleDateString()}</h5>
            {loggedInUser && user._id === loggedInUser._id && !originalCommentId && (
                <>
                    <Button cyan onClick={onEdit} >Edit</Button>
                    <Button onClick={onDelete} >Delete</Button>
                </>
            )}
            {originalCommentId === commentId ? (
                <>
                    <CommentEditorContainer />
                    <WriteCommentButtonContainer />
                </>
            ) : (
                <div className="content" dangerouslySetInnerHTML={{ __html: body }} />
            )}
            
        </CommentItemBlock>
    )
}

const CommentList = ({ loadingComments, comments, commentsError, originalCommentId, user, postId, history }) => {
    if (commentsError) {
        return <CommentListBlock>Error occured.</CommentListBlock>
    }
    return (
        <CommentListBlock>
            {!loadingComments && comments && (
            <div>
                {comments.map(comment => (
                    <CommentItem comment={comment} originalCommentId={originalCommentId} loggedInUser={user} postId={postId} history={history} key={comment._id} />
                ))}
            </div>
            )}
        </CommentListBlock>
    );
};

export default withRouter(CommentList);