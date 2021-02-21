import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as commentsAPI from '../lib/api/comments';
import { takeLatest } from 'redux-saga/effects';

const [
    LIST_COMMENTS,
    LIST_COMMENTS_SUCCESS,
    LIST_COMMENTS_FAILURE,
] = createRequestActionTypes('comments/LIST_COMMENTS');

export const listComments = createAction(LIST_COMMENTS, (postId) => (postId));

const listCommentsSaga = createRequestSaga(LIST_COMMENTS, commentsAPI.listComments);
export function* commentsSaga() {
    yield takeLatest(LIST_COMMENTS, listCommentsSaga);
};

const initialState = {
    comments: null,
    error: null,
};

const comments = handleActions(
    {
        [LIST_COMMENTS_SUCCESS]: (state, { payload: comments }) => ({
            ...state,
            comments,
        }),
        [LIST_COMMENTS_FAILURE]: (state, { payload: error }) => ({
            ...state,
            error,
        }),
    },
    initialState,
);

export default comments;
