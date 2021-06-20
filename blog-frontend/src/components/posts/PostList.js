import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import moment from 'moment';

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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 20rem;
    height: 26rem;
    margin: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
    border-radius: 0.5rem;
    background: white;
    .tags {
        padding: 0 1rem;
    }
    .subInfo {
        padding: 0.5rem 1rem 0.5rem;
        border-top: 1px solid rgb(238, 241, 245);
    }
`;

const PostItemLink = styled(Link)`
    display: block;
    .postImage {
        height: 10rem;
        background: var(--light-teal);
    }
    .postContent {
        padding: 0.5rem 1rem 0;
        .title {
            margin: 0 0 0.25rem;
            font-size: var(--ft-xl);
            font-weight: bold;
            color: var(--light-navy);
            word-break: break-word;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .date {
            margin: 0 0 0.4rem;
            font-size: var(--ft-sm);
            color: var(--light-steel);
        }
        .body {
            font-size: var(--ft-lg);
            color: var(--lightestest-navy);
            word-break: break-all;
        }
    }
`;

const PostItem = ({ post }) => {
    const { publishedDate, user, like_users, likes_count, tags, title, body, _id } = post;
    return (
        <PostItemCard>
            <PostItemLink to={`/@${user.nickname}/${_id}`}>
                <div className="postImage">image</div>
                <div className="postContent">
                    <div className="title">{title}</div>
                    <div className="date">{moment(publishedDate).format('HH: mm MMM-Do-YYYY')}</div>     
                    <div className="body">{body}</div>
                </div>
            </PostItemLink>
            <div className="tags">
                <Tags tags={tags} />
            </div>
            <div className="subInfo">
                <SubInfo nickname={user.nickname} likeUsers={like_users} likesCount={likes_count} />
            </div>
        </PostItemCard>
    );
};

const PostList = ({ posts, error, user }) => {
    
    if (error) return <PostListBlock>Error occured.</PostListBlock>;

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
                    {posts.map((post, index) => (
                        <PostItem post={post} key={index} />
                    ))}
            </PostItemWrapper>
            )}
        </PostListBlock>
    );
};

export default PostList;