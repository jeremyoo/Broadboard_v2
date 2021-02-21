import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import writePost, { writePostSaga } from './writePost';
import post, { postSaga } from './post';
import posts, { postsSaga } from './posts';
import writeComment, { writeCommentSaga } from './writeComment';
import comment, { commentSaga } from './comment';
import comments, { commentsSaga } from './comments';
import loading from './loading';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  writePost,
  post,
  posts,
  writeComment,
  comment,
  comments,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), writePostSaga(), postSaga(), postsSaga(), writeCommentSaga(), commentSaga(), commentsSaga()]);
}

export default rootReducer;
