import React from 'react';
import TagsContainer from '../containers/tags/TagsContainer';
import PaginationContainer from '../containers/common/PaginationContainer'
import Layout from '../components/common/Layout'

const PostListPage = () => {

    return(
        <Layout >
            <TagsContainer />
            <PaginationContainer />
        </Layout>
    )
}

export default PostListPage;