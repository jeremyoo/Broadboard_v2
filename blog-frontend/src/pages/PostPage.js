import React from 'react';
import PostViewerContainer from '../containers/post/PostViewerContainer';
import CommentEditorContainer from '../containers/writeComment/CommentEditorContainer';
import WriteCommentButtonContainer from '../containers/writeComment/WriteCommentButtonContainer';
import CommentListContainer from '../containers/comments/CommentListContainer';
import Layout from '../components/common/layout'

const PostPage = () => {
    return (
        <Layout>
            <PostViewerContainer />
            <CommentListContainer />
            <CommentEditorContainer />
            <WriteCommentButtonContainer />
        </Layout>
    )
}

export default PostPage;