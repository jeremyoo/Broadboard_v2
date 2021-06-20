import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as profileAPI from '../lib/api/profile';
import { takeLatest } from 'redux-saga/effects';

const [
  LIST_PROFILE,
  LIST_PROFILE_SUCCESS,
  LIST_PROFILE_FAILURE,
] = createRequestActionTypes('profile/LIST_PROFILE');

const CHANGE_PROFILE = 'profile/CHANGE_PROFILE';
const CHANGE_TAG = 'profile/CHANGE_TAG';
const CHANGE_PROFILEPAGE = 'profile/CHANGE_PROFILEPAGE';
const UNLOAD_PROFILE = 'profile/UNLOAD_PROFILE';

export const listProfile = createAction(LIST_PROFILE, ({profile, tag, page}) => ({profile, tag, page}));
export const changeProfile = createAction(CHANGE_PROFILE);
export const changeTag = createAction(CHANGE_TAG);
export const changeProfilePage = createAction(CHANGE_PROFILEPAGE);
export const unloadProfile = createAction(UNLOAD_PROFILE);
const listProfileSaga = createRequestSaga(LIST_PROFILE, profileAPI.listProfile);
export function* profileSaga() {
  yield takeLatest(LIST_PROFILE, listProfileSaga);
};

const initialState = {
  posts: null,
  taglist: null,
  user: null,
  error: null,
  lastPage: 1,
  page: 1,
  profile: '',
  tag: '',
};

const profile = handleActions(
  {
    [LIST_PROFILE_SUCCESS]: (state, { payload: data, meta: response }) => ({
      ...state,
      posts: (state.posts && state.page !== 1) ? [...state.posts, ...data.posts] : [...data.posts], 
      taglist: state.taglist ? state.taglist : data.taglist,
      user: state.user ? state.user : data.user,
      lastPage: parseInt(response.headers['last-page'], 10),
    }),
    [LIST_PROFILE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CHANGE_PROFILE]: (state, { payload: profile }) => ({
      ...state,
      profile: profile,
    }),
    [CHANGE_TAG]: (state, { payload: tag }) => ({
      ...state,
      tag: tag,
    }),
    [CHANGE_PROFILEPAGE]: (state) => ({
      ...state,
      page: state.page + 1,
    }),
    [UNLOAD_PROFILE]: () => initialState,
  },
  initialState,
);

export default profile;
