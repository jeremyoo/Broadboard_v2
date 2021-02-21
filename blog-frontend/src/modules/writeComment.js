import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as commentsAPI from '../lib/api/comments';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE_COMMENT = 'write/INITIALIZE_COMMENT';
const CHANGE_FIELD_COMMENT = 'write/CHANGE_FIELD_COMMENT';
const SET_ORIGINAL_COMMENT = 'write/SET_ORIGINAL_COMMENT';

const [
  WRITE_COMMENT,
  WRITE_COMMENT_SUCCESS,
  WRITE_COMMENT_FAILURE,
] = createRequestActionTypes('write/WRITE_COMMENT');

const [
  UPDATE_COMMENT,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
] = createRequestActionTypes('write/UPDATE_COMMENT');

export const initializeComment = createAction(INITIALIZE_COMMENT);
export const changeCommentField = createAction(CHANGE_FIELD_COMMENT, ({ key, value }) => ({
  key,
  value,
}));
export const write_Comment = createAction(WRITE_COMMENT, ({ body, postId }) => ({ body, postId }));
export const setOriginalComment = createAction(SET_ORIGINAL_COMMENT, (comment) => comment);
export const update_Comment = createAction(
  UPDATE_COMMENT,
  ({ postId, commentId, body }) => ({
    postId,
    commentId,
    body,
  }),
);

const writeComment_Saga = createRequestSaga(WRITE_COMMENT, commentsAPI.writeComment);
const updateComment_Saga = createRequestSaga(UPDATE_COMMENT, commentsAPI.updateComment);

export function* writeCommentSaga() {
  yield takeLatest(WRITE_COMMENT, writeComment_Saga);
  yield takeLatest(UPDATE_COMMENT, updateComment_Saga);
}

const initialState = {
  body: '',
  comment: null,
  commentError: null,
  originalCommentId: null,
};

const writeComment = handleActions(
  {
    [INITIALIZE_COMMENT]: (state) => initialState,
    [CHANGE_FIELD_COMMENT]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
      ...state,
      comment,
    }),
    [WRITE_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
      ...state,
      commentError,
    }),
    [SET_ORIGINAL_COMMENT]: (state, { payload: comment }) => ({
      ...state,
      body: comment.body,
      originalCommentId: comment._id,
    }),
    [UPDATE_COMMENT_SUCCESS]: (state, { payload: comment }) => ({
      ...state,
      comment,
    }),
    [UPDATE_COMMENT_FAILURE]: (state, { payload: commentError }) => ({
      ...state,
      commentError,
    }),
  },
  initialState,
);

export default writeComment;
