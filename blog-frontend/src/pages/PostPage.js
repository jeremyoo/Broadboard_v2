import React from 'react';
import PostViewerContainer from '../containers/post/PostViewerContainer';
import CommentContainer from '../containers/comments/CommentContainer'
import Layout from '../components/common/layout'

const PostPage = () => {

    return (
        <Layout>
            <PostViewerContainer />
            <CommentContainer />
        </Layout>
    )
}

export default PostPage;