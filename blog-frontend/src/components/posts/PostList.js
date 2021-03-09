import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';

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

const PostItemCard = styled.div`
    width: 20rem;
    margin: 1rem;
    padding: 1rem;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
    border-radius: 4px;
`;

const PostItem = ({ post }) => {
    const { publishedDate, user, tags, title, body, _id } = post;
    return (
        <PostItemCard>
            <h2>
                <Link to={`/@${user.nickname}/${_id}`}>{title}</Link>
            </h2>
            <SubInfo nickname={user.nickname} publishedDate={new Date(publishedDate)} />
            <Tags tags={tags} />
            <p>{body}</p>
        </PostItemCard>
    );
};

const PostList = ({ posts, loading, error, user }) => {
    if (error) {
        return <PostListBlock>Error occured.</PostListBlock>;
    }
    return (
        <PostListBlock>
            <WritePostButtonWrapper>
                {user && (
                <Button cyan to="/write">
                    New Post
                </Button>
                )}
            </WritePostButtonWrapper>
            {posts && (
            <PostItemWrapper>
                    {posts.map(post => (
                        <PostItem post={post} key={post._id} />
                    ))}
            </PostItemWrapper>
            )}
        </PostListBlock>
    );
};

export default PostList;