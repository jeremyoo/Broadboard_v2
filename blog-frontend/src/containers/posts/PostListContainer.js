import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';
import { unloadProfile } from '../../modules/profile';
import { unloadTagsPosts } from '../../modules/tags';

const PostListContainer = () => {
    const dispatch = useDispatch();
    const { posts, page, error, loading, user } = useSelector(
        ({ posts, loading, user }) => ({
            posts: posts.posts,
            page: posts.page,
            error: posts.error,
            loading: loading['posts/LIST_POSTS'],
            user: user.user,
        }),
    );

    useEffect(() => {
        if (page && posts && posts.length / 12 === page ) return;
        dispatch(listPosts({page}));
    }, [dispatch, page]);

    useEffect(() => {
        dispatch(unloadProfile());
        dispatch(unloadTagsPosts());
    }, []);

    return (
        <PostList
            loading={loading}
            error={error}
            posts={posts}
            user={user}
        />
    );
};

export default withRouter(PostListContainer);