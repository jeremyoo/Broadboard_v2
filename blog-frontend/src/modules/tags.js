import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as tagsAPI from '../lib/api/tags';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_TAGSPOSTS,
  LIST_TAGSPOSTS_SUCCESS,
  LIST_TAGSPOSTS_FAILURE,
] = createRequestActionTypes('tags/LIST_TAGSPOSTS');

const CHANGE_TAGS = 'tags/CHANGE_TAGS'
const CHANGE_TAGSPAGE = 'tags/CHANGE_TAGSPAGE'
const UNLOAD_TAGSPOSTS = 'tags/UNLOAD_TAGSPOSTS';

export const listTagsPosts = createAction(LIST_TAGSPOSTS, ({tag, page}) => ({tag, page}));
export const changeTags = createAction(CHANGE_TAGS);
export const changeTagsPage = createAction(CHANGE_TAGSPAGE);
export const unloadTagsPosts = createAction(UNLOAD_TAGSPOSTS);

const listTagsPostsSaga = createRequestSaga(LIST_TAGSPOSTS, tagsAPI.listTagsPosts);
export function* tagspostsSaga() {yield takeLatest(LIST_TAGSPOSTS, listTagsPostsSaga)};

const initialState = {
  posts: null,
  error: null,
  lastPage: 1,
  page: 1,
  tag: '',
};

const tags = handleActions(
  {
    [LIST_TAGSPOSTS_SUCCESS]: (state, { payload: posts, meta: response }) => ({
      ...state,
      posts: state.posts && state.page !== 1 ? [...state.posts, ...posts] : [...posts], 
      lastPage: parseInt(response.headers['last-page'], 10),
    }),
    [LIST_TAGSPOSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CHANGE_TAGS]: (state, { payload: tag }) => ({
      ...state,
      tag: tag,
    }),
    [CHANGE_TAGSPAGE]: (state) => ({
      ...state,
      page: state.page + 1,
    }),
    [UNLOAD_TAGSPOSTS]: () => (initialState),
  },
  initialState,
);

export default tags;