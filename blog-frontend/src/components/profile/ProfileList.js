import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PostItem from '../common/PostItem';
import Responsive from '../common/Responsive';

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
                    <PostItem post={post} key={index} />
                )))}
            </ProfileItemWrapper>
        </ProfileListBlock>
    );
};

export default ProfileList;