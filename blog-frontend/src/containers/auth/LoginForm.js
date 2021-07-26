import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';

const LoginForm = ({ history, onAuthOff, onSwitchType }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({auth, user}) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));

    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        );
    };

    const onSubmit = e => {
        e.preventDefault();
        const { username, password } = form;
        dispatch(login({ username, password }))
    }

    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);
    
    useEffect(() => {
        if (authError) {
            console.log('Error occured');
            setError('Log-in failed, please try again');
            return;
        }
        if (auth) {
            console.log('Successful');
            dispatch(check());
        }
    }, [auth, authError, dispatch])

    useEffect(() => {
        if (user) {
            history.goBack();
            onAuthOff();
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStrage is not working');
            }
        }
    }, [history, user]);

    return (
        <AuthForm
            type="login"
            form={form}
            onAuthOff={onAuthOff}
            onChange={onChange}
            onSubmit={onSubmit}
            onSwitchType={onSwitchType}
            error={error}
        />
    );
};

export default withRouter(LoginForm);