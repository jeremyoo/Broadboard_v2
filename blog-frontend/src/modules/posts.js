import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_POSTS,
  LIST_POSTS_SUCCESS,
  LIST_POSTS_FAILURE,
] = createRequestActionTypes('posts/LIST_POSTS');

const CHANGE_PAGE = 'posts/CHANGE_PAGE'
const UNLOAD_POSTS = 'post/UNLOAD_POSTS';

export const listPosts = createAction(LIST_POSTS, (page) => (page));
export const changePage = createAction(CHANGE_PAGE);
export const unloadPosts = createAction(UNLOAD_POSTS);

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
export function* postsSaga() {yield takeLatest(LIST_POSTS, listPostsSaga)};


const initialState = {
  posts: null,
  error: null,
  lastPage: 1,
  page: 1,
  tags: '',
};

const posts = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: posts, meta: response }) => ({
      ...state,
      posts: state.posts ? [...state.posts, ...posts] : [...posts], 
      lastPage: parseInt(response.headers['last-page'], 10),
    }),
    [LIST_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CHANGE_PAGE]: (state) => ({
      ...state,
      page: state.page + 1,
    }),
    [UNLOAD_POSTS]: () => initialState,
  },
  initialState,
);

export default posts;
