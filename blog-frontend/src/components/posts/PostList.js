import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom'
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import PostItem from '../common/PostItem';
import Button from '../common/Button';

const PostListBlock = styled(Responsive)`
    margin-top: 4rem;
`;

const WritePostButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 2rem 0;
`;

const PostItemWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: -2rem;
`;

const PostList = ({ posts, error, user, history }) => {
    
    const write = useCallback(() => history.push('/write'));

    if (error) return <PostListBlock>Error occured.</PostListBlock>;

    return (
        <PostListBlock>
            <WritePostButtonWrapper>
                {user && (
                <Button onClick={write} cyan>New Post</Button>
                )}
            </WritePostButtonWrapper>
            {posts && (
            <PostItemWrapper>
                    {posts.map((post, index) => (
                        <PostItem post={post} key={index} smalleritem={1} preview={0} />
                    ))}
            </PostItemWrapper>
            )}
        </PostListBlock>
    );
};

export default withRouter(PostList);