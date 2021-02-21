import React, { useEffect, useCallback } from 'react';
import CommentEditor from '../../components/writeComment/CommentEditor';
import { useSelector, useDispatch } from 'react-redux';
import { changeCommentField, initializeComment } from '../../modules/writeComment';

const CommentEditorContainer = () => {
    const dispatch = useDispatch();
    const { body, loadingPost, loadingComments } = useSelector(({ writeComment, loading }) => ({
        body: writeComment.body,
        loadingPost: loading['post/READ_POST'],
        loadingComments: loading['comments/LIST_COMMENTS'],
        })
    );

    const onChangeComment = useCallback(
        (payload) => dispatch(changeCommentField(payload)),
        [dispatch],
    );

    useEffect(() => {
        return () => {
            dispatch(initializeComment());
        }
    }, [dispatch]);
    
    if (loadingPost || loadingComments) return null;

    return <CommentEditor onChangeComment={onChangeComment} body={body} />;
};

export default CommentEditorContainer;
