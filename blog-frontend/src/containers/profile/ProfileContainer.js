import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileList from '../../components/profile/ProfileList';
import { listProfile, changeProfile, changeTag } from '../../modules/profile';
import { unloadTagsPosts } from '../../modules/tags';

const ProfileContainer = ({ history }) => {
    const dispatch = useDispatch();
    const { posts, taglist, page, user, profile, tag, error, loading } = useSelector(
        ({ profile, loading }) => ({
            posts: profile.posts,
            taglist: profile.taglist,
            page: profile.page,
            user: profile.user,
            profile: profile.profile,
            tag: profile.tag,
            error: profile.error,
            loading: loading['profile/LIST_PROFILE'],
        }),
    );

    useEffect(() => {
        dispatch(unloadTagsPosts());
        const currentUrl = history.location.pathname.split('/')[1];
        currentUrl !== "" && currentUrl.includes('@') ? onChangeProfile(`${currentUrl.substring(1)}`) : onChangeProfile('');
        if (profile.length !== 0) dispatch(listProfile({profile, tag, page}));
    }, [dispatch, profile, tag, page]);

    const onChangeProfile = (profile) => dispatch(changeProfile(profile));
    const onChangeTag = (tag) => dispatch(changeTag(tag));

    return (
        <ProfileList
            posts={posts}
            taglist={taglist}
            user={user}
            profile={profile}
            loading={loading}
            error={error}
            onChangeTag={onChangeTag}
        />
    );
};

export default withRouter(ProfileContainer);