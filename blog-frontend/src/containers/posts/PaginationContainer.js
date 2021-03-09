import React, { useEffect, useCallback } from 'react';
import Pagination from '../../components/posts/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changePage } from '../../modules/posts';
import qs from 'qs';

const PaginationContainer = () => {
    const dispatch = useDispatch();
    const { lastPage, page, posts, loading } = useSelector(({ posts, loading }) => ({
        posts: posts.posts,
        page: posts.page,
        lastPage: posts.lastPage,
        loading: loading['posts/LIST_POSTS'],
    }));

    const infiniteScroll = useCallback(() => {
        let scrollHeight = document.documentElement.scrollHeight * 0.9;
        let scrollTop = document.documentElement.scrollTop;
        let clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight) {
            if (loading === false && lastPage >= page) {
                return dispatch(changePage());
            }
            return;
        }
    })

    useEffect(() => {
        window.addEventListener("scroll", infiniteScroll, true);
        return () => {
            window.removeEventListener("scroll", infiniteScroll, true);
        }
    }, [loading])

    if (!posts || loading) return null;

    return (
        <Pagination
            page={parseInt(page, 10)}
            lastPage={lastPage}
        />
    );
};

export default withRouter(PaginationContainer);

