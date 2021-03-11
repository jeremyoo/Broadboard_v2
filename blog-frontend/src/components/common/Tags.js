import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const TagsBlock = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    line-height: 1;
    .tag {
        font-size: var(--ft-sm);
        margin-right: 0.5rem;
        display: inline-block;
        color: ${palette.cyan[7]};
        text-decoration: none;
        &:hover {
            color: ${palette.cyan[6]};
        }
    }
`;

const Tags = ({ tags }) => {
    return (
        <TagsBlock>
            {tags.map(tag => (
                <Link className="tag" to={`/?tag=${tag}`} key={tag} >
                    #{tag}
                </Link>
            ))}
        </TagsBlock>
    );
};

export default Tags;

// word-break: break-word;
// text-overflow: ellipsis;
// overflow: hidden;
// white-space: nowrap;