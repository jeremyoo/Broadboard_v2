import React, { useRef } from 'react';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/posts/PaginationContainer';
import Layout from '../components/common/layout'

const PostListPage = () => {

    return(
        <Layout >
            <PostListContainer />
            <PaginationContainer />
        </Layout>
    )
}

export default PostListPage;