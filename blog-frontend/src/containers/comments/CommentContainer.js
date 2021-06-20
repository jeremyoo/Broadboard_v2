import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeComment } from '../../modules/writeComment';
import CommentWriteContainer from '../comments/CommentWriteContainer';
import CommentListContainer from '../comments/CommentListContainer';

const CommentContainer = ({ history }) => {
    const dispatch = useDispatch();
    const { user, loadingComments } = useSelector(({ user, loading }) => ({
        user: user.user,
        loadingComments: loading['comments/LIST_COMMENTS'],
        })
    )

    const [ addComment, setAddComment ] = useState(false);
    const onClickAdd = () => {
        if (!user) {
            return history.push('/login');
        }
        setAddComment(!addComment);
        dispatch(initializeComment());
    }
    const onCancelAdd = () => setAddComment(false);

    return (
        <>
            <CommentWriteContainer
                addComment={addComment}
                onClickAdd={onClickAdd}
                onCancelAdd={onCancelAdd}
                loadingComments={loadingComments}    
            />
            <CommentListContainer onCancelAdd={onCancelAdd} />
        </>
    )
};

export default withRouter(CommentContainer);

