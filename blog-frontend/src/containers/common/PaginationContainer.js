import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changePage } from '../../modules/posts';
import { changeProfilePage } from '../../modules/profile';
import { changeTagsPage } from '../../modules/tags';

const PaginationContainer = () => {
    const dispatch = useDispatch();
    const {
        posts, page, lastPage, loading, 
        profile, postsProfile, pageProfile, lastPageProfile, loadingProfile,
        tag, postsTags, pageTags, lastPageTags, loadingTags, 
    } = useSelector(({ posts, profile, tags, loading }) => ({
        posts: posts.posts,
        page: posts.page,
        lastPage: posts.lastPage,
        loading: loading['posts/LIST_POSTS'],

        profile: profile.profile,
        postsProfile: profile.posts,
        pageProfile: profile.page,
        lastPageProfile: profile.lastPage,
        loadingProfile: loading['profile/LIST_PROFILE'],

        tag: tags.tag,
        postsTags: tags.posts,
        pageTags: tags.page,
        lastPageTags: tags.lastPage,
        loadingTags: loading['tags/LIST_TAGSPOSTS'],
    }));

    const infiniteScroll = useCallback(() => {
        let scrollHeight = document.documentElement.scrollHeight;
        let scrollTop = document.documentElement.scrollTop;
        let clientHeight = document.documentElement.clientHeight;
        if ((scrollTop + clientHeight >= scrollHeight * 0.9) && scrollHeight !== clientHeight) {
            if (posts && !tag && !profile && loading === false && lastPage > page) return dispatch(changePage());
            if (postsProfile && !tag && loadingProfile === false && lastPageProfile > pageProfile) return dispatch(changeProfilePage());
            if (postsTags && tag && !profile && loadingTags === false && lastPageTags > pageTags) return dispatch(changeTagsPage());
            return;
        };
    })

    useEffect(() => {
        window.addEventListener("scroll", infiniteScroll, true);
        return () => {
            window.removeEventListener("scroll", infiniteScroll, true);
        }
    }, [loading, loadingProfile, loadingTags, infiniteScroll])
    
    if ((!posts || loading) && (!postsProfile || loadingProfile) && (!postsTags || loadingTags)) return null;
    
    return (
        <div />
    );
};

export default withRouter(PaginationContainer);

