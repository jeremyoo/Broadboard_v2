import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as commentsAPI from '../lib/api/comments';
import { takeLatest } from 'redux-saga/effects';

const [
    READ_COMMENT,
    READ_COMMENT_SUCCESS,
    READ_COMMENT_FAILURE,
] = createRequestActionTypes('comment/READ_COMMENT');

const UNLOAD_COMMENT = 'comment/UNLOAD_COMMENT';

export const readComment = createAction(READ_COMMENT, ({ postId, commentId }) => ({ postId, commentId }));
export const unloadComment = createAction(UNLOAD_COMMENT);

const readCommentSaga = createRequestSaga(READ_COMMENT, commentsAPI.readComment);
export function* commentSaga() {
    yield takeLatest(READ_COMMENT, readCommentSaga);
}

const initialState = {
    comment: null,
    error: null,
};

const comment = handleActions(
    {
        [READ_COMMENT_SUCCESS]: (state, {payload: comment}) => ({
            ...state,
            comment,
        }),
        [READ_COMMENT_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [UNLOAD_COMMENT]: () => initialState,
    },
    initialState
);

export default comment;