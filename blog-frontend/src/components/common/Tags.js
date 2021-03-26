import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const TagsBlock = styled.div`
    ${props => props.viewerTags ?
        css`
            .tag {
                margin: 0.25rem;
                border-radius: 1.5rem;
                padding: 0.3rem 0.5rem;
                font-size: var(--ft-md);
                color: var(--brightest-white);
                background: var(--lightestestest-navy);
                vertical-align: middle;
            }
        ` :
        css`
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;  
            overflow: hidden;
            line-height: 1.15;
            .tag {
                margin-right: 0.5rem;
                display: inline-block;
                font-size: var(--ft-sm);
                color: ${palette.cyan[7]};
                text-decoration: none;
                &:hover {
                    color: ${palette.cyan[6]};
                }
            }
        `
    };

`;

const Tags = ({ tags, viewerTags }) => {
    return (
        <TagsBlock viewerTags={viewerTags}>
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