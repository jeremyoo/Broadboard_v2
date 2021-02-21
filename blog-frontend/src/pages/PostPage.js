import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewerContainer from '../containers/post/PostViewerContainer';
import CommentEditorContainer from '../containers/writeComment/CommentEditorContainer';
import WriteCommentButtonContainer from '../containers/writeComment/WriteCommentButtonContainer';
import CommentListContainer from '../containers/comments/CommentListContainer';

const PostPage = () => {
    return (
        <>
            <HeaderContainer />
            <PostViewerContainer />
            <CommentListContainer />
            <CommentEditorContainer />
            <WriteCommentButtonContainer />
        </>
    )
}

export default PostPage;