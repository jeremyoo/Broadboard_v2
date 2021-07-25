import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import { changeType } from '../../modules/auth';
import { changeProfile, changeTag } from '../../modules/profile';

const HeaderContainer = ({ history, scrollDown, scrollUp, authOn }) => {
    const { user, profile, tag } = useSelector(({ user, profile, tags }) => ({
        user: user.user,
        profile: profile.profile,
        tag: tags.tag,
    }));
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
        history.push('/');
    };
    const onChangeProfile = (profile) => {dispatch(changeProfile(profile));  dispatch(changeTag(''));}
    
    const onClickLogin = () => {
        dispatch(changeType('login'));
        authOn();
    }
    const onClickRegister = () => {
        dispatch(changeType('register'));
        authOn();
    }

    return <Header user={user} onClickLogin={onClickLogin} onClickRegister={onClickRegister} onLogout={onLogout} scrollDown={scrollDown} scrollUp={scrollUp} onChangeProfile={onChangeProfile} profile={profile} tag={tag} />;
};

export default withRouter(HeaderContainer);