import React from 'react';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/common/PaginationContainer';
import Layout from '../components/common/Layout'

const PostListPage = () => {

    return(
        <Layout >
            <PostListContainer />
            <PaginationContainer />
        </Layout>
    )
}

export default PostListPage;