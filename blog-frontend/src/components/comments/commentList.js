import React from 'react';
import { withRouter } from 'react-router-dom';
import Responsive from '../common/Responsive'
import Button from '../common/Button'
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { useDispatch } from 'react-redux';
import { update_Comment, setOriginalComment } from '../../modules/writeComment';
import CommentEditorContainer from '../../containers/writeComment/CommentEditorContainer';
import WriteCommentButtonContainer from '../../containers/writeComment/WriteCommentButtonContainer';
import { removeComment } from '../../lib/api/comments';
import moment from 'moment';

const CommentListBlock = styled(Responsive)`
    width: 768px;
    padding: 2rem 0 4rem;
`;

const CommentItemBlock = styled.div`
    padding: 1rem 0 2rem;
    ${props => props.originalCommentId === props.commentId ? (css`
        background: var(--bright-white);
        border: 1px solid ${palette.gray[2]};
        border-radius: 6px;
        margin-bottom: 1rem;
    `): (css`
        background: var(--brightest-white);
        & + & {
            border-top: 1px solid ${palette.gray[2]};
        };
    `)};
    .subContainer {
        padding: 0 1rem;
        margin-bottom: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: middle;
    }
    .subinfo {
        display: flex;
        .profile {
            border-radius: 50%;
            width: 4rem;
            height: 4rem;
            background-color: var(--lightest-navy);
            margin-right: 1rem; 
        }
        .info {
            display: flex;
            flex-direction: column;
            justify-content: center;
                .nickname {
                    font-weight: bold;
                    color: var(--light-navy)
                }
                .date {
                    margin-top: 0.25rem;
                    color: var(--steel)
                }
        }
    }
    .commentBtns {
        display: flex;
        height: 2rem;
        margin-top: 0.5rem;
        .editBtn {
            margin-right: 0.5rem;
        }
    }
`;

const CommentContent = styled.div`
    padding: 0.75rem 1rem;
    overflow-x: auto;
    word-break: break-all;
`;




const CommentItem = ({ comment, originalCommentId, loggedInUser, postId, history, onCancelAdd }) => {
    const { publishedDate, user, body } = comment;
    const commentId = comment._id;
    const dispatch = useDispatch();
    const onEdit = async () => {
        await onCancelAdd();
        dispatch(setOriginalComment(comment));
    }
    const onUpdate = () => dispatch(update_Comment({ postId, commentId, body }));
    const onDelete = async () => {
        await removeComment({ postId, commentId });
        history.push(`${history.location.pathname}`)
    };
    return (
        <CommentItemBlock originalCommentId={originalCommentId} commentId={commentId}>
            <div className='subContainer'>
                <div className='subinfo'>
                    <div className='profile' />
                    <div className='info'>
                        <div className='nickname'>{user.nickname}</div>
                        <div className='date'>{moment(publishedDate).format('HH: mm MMM-Do-YYYY')}</div>
                    </div>
                </div>
                <div className='commentBtns'>
                {loggedInUser && originalCommentId === commentId ? (
                    <WriteCommentButtonContainer onCancelAdd={onCancelAdd} originalCommentId={originalCommentId} />
                ) :
                loggedInUser && user._id === loggedInUser._id && (<>
                    <Button className='editBtn' cyan onClick={onEdit} >Edit</Button>
                    <Button className='deleteBtn' onClick={onDelete} >Delete</Button>
                </>)
                }
                </div>
            </div>
            {originalCommentId === commentId ? (
                <CommentEditorContainer originalCommentId={originalCommentId} />
            ) : (
                <CommentContent dangerouslySetInnerHTML={{ __html: body }} />
            )}
        </CommentItemBlock>
    )
}

const CommentList = ({ loadingComments, comments, commentsError, originalCommentId, user, postId, history, onCancelAdd }) => {
    if (commentsError) {
        return <CommentListBlock>Error occured.</CommentListBlock>
    }
    return (
        <CommentListBlock>
            {!loadingComments && comments && (
            <>
                {comments.map(comment => (
                    <CommentItem comment={comment} originalCommentId={originalCommentId} loggedInUser={user} postId={postId} history={history} key={comment._id} onCancelAdd={onCancelAdd} />
                ))}
            </>
            )}
        </CommentListBlock>
    );
};

export default withRouter(CommentList);