import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { changeType, initializeType } from '../../modules/auth';

const AuthContainer = ({ authOff, type }) => {
    const dispatch = useDispatch();

    const onSwitchType = () => {
        if (type === 'login') return dispatch(changeType('register'));
        if (type === 'register') return dispatch(changeType('login'));
    }

    const onAuthOff = () => {
        authOff();
        dispatch(initializeType());
    }

    return (
        <>
            {type === 'login' && <LoginForm onSwitchType={onSwitchType} onAuthOff={onAuthOff} />}
            {type === 'register' && <RegisterForm onSwitchType={onSwitchType} onAuthOff={onAuthOff} />}
        </>
    )
}

export default AuthContainer;