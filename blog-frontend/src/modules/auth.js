import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'

const CHANGE_TYPE = 'auth/CHANGE_TYPE';
const INITIALIZE_TYPE = 'auth/INITIALIZE_TYPE';
const INITIALIZE_PROFILEPIC = 'write/INITIALIZE_PROFILEPIC';


const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');

export const changeField = createAction(
    CHANGE_FIELD,
    ({ form, key, value }) => ({
        form, // register, login
        key, // username, password, passwordConfrim
        value, // value to change
    }),
    );
export const initializeForm = createAction(INITIALIZE_FORM,
    form => form // register / login
);

export const changeType = createAction(CHANGE_TYPE, type => type);
export const initializeType = createAction(INITIALIZE_TYPE);
export const initializeProfilePic = createAction(INITIALIZE_PROFILEPIC);

export const register = createAction(REGISTER, ({ username, nickname, password, profilePic, sentence }) => ({
    username,
    nickname, 
    password,
    profilePic,
    sentence,
}));

export const login = createAction(LOGIN, ({ username, password }) => ({
    username,
    password,
}))

// create saga
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
export function* authSaga() {
    yield takeLatest(REGISTER, registerSaga);
    yield takeLatest(LOGIN, loginSaga);
}

// initial state
const initialState = {
    register: {
        username: '',
        nickname: '',
        password: '',
        passwordConfirm: '',
        profilePic: {},
        sentence: '',
    },
    login: {
        username: '',
        password: '',
    },
    type: '',
    auth: null,
    authError: null
};

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
            produce(state, draft => {
                draft[form][key] = value; // ex: state.register.username
        }),
        [INITIALIZE_FORM]: (state, { payload: form }) => ({
            ...state,
            [form]: initialState[form],
            authError: null, // initialize error
        }),
        [INITIALIZE_PROFILEPIC]: (state) =>
            produce(state, draft => {
                draft.register.profilePic = {};
        }),
        [CHANGE_TYPE]: (state, { payload: type }) => ({
            ...state,
            type: type,
        }),
        [INITIALIZE_TYPE]: (state) => ({
            ...state,
            type: '',
        }),
        // Register success
        [REGISTER_SUCCESS]: (state, {payload: auth}) => ({
            ...state,
            authError: null,
            auth,
        }),
        // Register fail
        [REGISTER_FAILURE]: (state, {payload: error }) => ({
            ...state,
            authError: error,
        }),
        // Login success
        [LOGIN_SUCCESS]: (state, {payload: auth}) => ({
            ...state,
            authError: null,
            auth,
        }),
        // Login fail
        [LOGIN_FAILURE]: (state, {payload: error}) => ({
            ...state,
            authError: error,
        }),
    },
    initialState,
);

export default auth;
