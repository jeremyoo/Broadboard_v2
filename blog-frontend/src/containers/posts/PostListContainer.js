import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';

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
        dispatch(listPosts({ page }));
    }, [dispatch, page]);

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