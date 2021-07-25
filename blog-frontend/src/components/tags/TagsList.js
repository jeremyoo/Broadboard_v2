import React from 'react';
import styled from 'styled-components';
import PostItem from '../common/PostItem';
import Responsive from '../common/Responsive';

const TagsListBlock = styled(Responsive)`
    margin-top: 4.5rem;
    width: 768px;
`;

const SearchBlock = styled.div`
    margin-bottom: 4rem;
`;

const ProfileItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TagsList = ({ posts, error }) => {
    if (error) return <TagsListBlock>Error occured.</TagsListBlock>;

    return (
        <TagsListBlock>
            <SearchBlock>
                <form>
                    <label></label>
                </form>
            </SearchBlock>
            <ProfileItemWrapper>
                {posts && (posts.map((post, index) => (
                    <PostItem post={post} key={index} />
                )))}
            </ProfileItemWrapper>
        </TagsListBlock>
    );
};

export default TagsList;