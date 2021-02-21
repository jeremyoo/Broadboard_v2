import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE_POST = 'write/INITIALIZE_POST';
const CHANGE_FIELD_POST = 'write/CHANGE_FIELD_POST';
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';

const [
  WRITE_POST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
] = createRequestActionTypes('write/WRITE_POST');

const [
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
] = createRequestActionTypes('write/UPDATE_POST');

export const initializePost = createAction(INITIALIZE_POST);
export const changePostField = createAction(CHANGE_FIELD_POST, ({ key, value }) => ({
  key,
  value,
}));
export const setOriginalPost = createAction(SET_ORIGINAL_POST, (post) => post);
export const write_Post = createAction(WRITE_POST, ({ title, body, tags }) => ({
  title,
  body,
  tags,
}));
export const update_Post = createAction(
  UPDATE_POST,
  ({ id, title, body, tags }) => ({
    id,
    title,
    body,
    tags,
  }),
);

const writePost_Saga = createRequestSaga(WRITE_POST, postsAPI.writePost);
const updatePost_Saga = createRequestSaga(UPDATE_POST, postsAPI.updatePost);

export function* writePostSaga() {
  yield takeLatest(WRITE_POST, writePost_Saga);
  yield takeLatest(UPDATE_POST, updatePost_Saga);
}

const initialState = {
  title: '',
  body: '',
  tags: [],
  post: null,
  postError: null,
  originalPostId: null,
};

const writePost = handleActions(
  {
    [INITIALIZE_POST]: (state) => initialState,
    [CHANGE_FIELD_POST]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
    [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
      ...state,
      title: post.title,
      body: post.body,
      tags: post.tags,
      originalPostId: post._id,
    }),
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
  },
  initialState,
);

export default writePost;
