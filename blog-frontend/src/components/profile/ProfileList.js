import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from '../common/Responsive';
import Tags from '../common/Tags';
import moment from 'moment';

const ProfileListBlock = styled(Responsive)`
    margin-top: 4.5rem;
    width: 768px;
`;

const ProfileTagBlock = styled.div`
    position: absolute;
    right: calc(50vw + 27.5rem);
`;

const ProfileTag = styled.div`
    display: flex;
    margin: 0.25rem 0;
    .type0 {
        margin-right: 1rem;
        cursor: pointer;
    }
`;

const ProfileUserBlock = styled.div`
    margin-bottom: 4rem;
`;

const ProfileUser = styled.div`
    display: flex;
    justify-content: center;
`;

const ProfileItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProfileItemCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 40rem;
    padding-bottom: 4rem;
    overflow: hidden;
    .tags {
        padding: 0 1rem;
    }
    .subInfo {
        padding: 0.5rem 1rem 0.5rem;
        border-top: 1px solid rgb(238, 241, 245);
    }
`;

const ProfileItemLink = styled(Link)`
    display: block;
    .profileImage {
        height: 20rem;
        background: var(--light-teal);
    }
    .profileContent {
        padding: 0.5rem 1rem 0;
        .title {
            margin: 0 0 0.25rem;
            font-size: var(--ft-xxl);
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

const ProfileItem = ({ post }) => {
    const { publishedDate, user, like_users, likes_count, tags, title, body, _id } = post;
    return (
        <ProfileItemCard>
            <ProfileItemLink to={`/@${user.nickname}/${_id}`}>
                <div className="profileImage">image</div>
                <div className="profileContent">
                    <div className="title">{title}</div>
                    <div className="body">{body}</div>
                </div>
            </ProfileItemLink>
            <div className="tags">
                <Tags tags={tags} viewerTags />
            </div>
            <div className="subInfo">
                <div className="date">{moment(publishedDate).format('HH: mm MMM-Do-YYYY')}</div>
                <div className="">
                    <div>{like_users.length}</div>
                    <div>{likes_count}</div>
                </div>
            </div>
        </ProfileItemCard>
    );
};

const ProfileList = ({ posts, taglist, user, profile, error, onChangeTag }) => {
    if (error) return <ProfileListBlock>Error occured.</ProfileListBlock>;

    return (
        <ProfileListBlock>
            <ProfileUserBlock>
                {user && (
                <ProfileUser>
                    <div className="profileImage"></div>
                    <div className="profileImage">{user.nickname}</div>
                    <div className="profileImage">{user.username}</div>
                    <div className="profileImage">{user.sentence}</div>
                </ProfileUser>
                )}
            </ProfileUserBlock>
            <ProfileTagBlock>
                        {taglist && (taglist.map((tags, kox) => 
                        <ProfileTag key={kox}>
                            {(
                                tags.map((tag, index) => (
                                    index === 0 ? (
                                        <Link to={`/@${profile}?tag=${tag}`} onClick={() => onChangeTag(tag)} className={`type${index}`} key={index}>{tag}</Link>
                                    ) : (
                                        <div className={`type${index}`} key={index}>{tag}</div>
                                    )
                                ))
                            )}
                        </ProfileTag>
                        ))}
                </ProfileTagBlock>
            <ProfileItemWrapper>
                {posts && (posts.map((post, index) => (
                    <ProfileItem post={post} key={index} />
                )))}
            </ProfileItemWrapper>
        </ProfileListBlock>
    );
};

export default ProfileList;