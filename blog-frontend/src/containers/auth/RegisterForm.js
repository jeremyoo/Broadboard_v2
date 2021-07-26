import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, initializeProfilePic, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history, onAuthOff, onSwitchType }) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(({auth, user}) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user,
    }));
    const profilePic = form.profilePic;

    const onChange = useCallback((e) => {
        const { value, name } = e.target;
        dispatch(changeField({form: 'register', key: name, value }));
    }, [dispatch]);

    const onChangeProfile = useCallback((payload) => {
        dispatch(changeField(payload));
    }, [dispatch]);

    const onInitializeProfilePic = () => {
        dispatch(initializeProfilePic());
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { username, nickname, password, passwordConfirm, sentence } = form;
        if ([username, nickname, password, passwordConfirm].includes('')) {
            setError('Please fill in all the blanks');
            return;
        }
        if (password !== passwordConfirm) {
            setError('Password is incorrect');
            dispatch(changeField({ form:'register', key:'password', value:''}));
            dispatch(changeField({ form:'register', key:'passwordConfirm', value:''}));
            return;
        }
        dispatch(register({ username, nickname, password, profilePic, sentence }));
    };

    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);
    
    useEffect(() => {
        if (authError) {
            if (authError.response.status === 409) {
                setError('The username already exists');
                return;
            }
            setError('Register failed, please try again');
        };
        if (auth) {
            console.log('Successful');
            dispatch(check());
        };
    }, [auth, authError, dispatch]);

    useEffect(() => {
        if (user) {
            history.push('/');
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
            type="register"
            form={form}
            onAuthOff={onAuthOff}
            onChange={onChange}
            onChangeProfile={onChangeProfile}
            onInitializeProfilePic={onInitializeProfilePic}
            onSubmit={onSubmit}
            onSwitchType={onSwitchType}
            error={error}
        />
    );
};

export default  withRouter(RegisterForm);