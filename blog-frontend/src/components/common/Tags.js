import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import { useDispatch, useSelector } from 'react-redux';
import { changeTags, unloadTagsPosts } from '../../modules/tags'

const TagsBlock = styled.div`
    ${props => props.smalleritem ?
        css`
            padding: 0 1rem;
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
            ${props => props.preview && css`
                pointer-events: none;
            `}
        ` :
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
        `
    };
`;

const Tags = ({ tags, smalleritem, preview }) => {
    const dispatch = useDispatch();
    const { tagState } = useSelector(({ tags }) => ({ tagState: tags.tag }));

    const onChangeTags = useCallback((tag) => { dispatch(unloadTagsPosts()); dispatch(changeTags(tag));});

    return (
        <TagsBlock smalleritem={smalleritem} preview={preview}>
            {tags.map(tag => (
                <Link className="tag" to={`/tags/${tag}`}
                    onClick={() => {
                        if (tagState !== tag) onChangeTags(tag);
                        window.scrollTo(0, 0);
                    }}
                key={tag} >
                    #{tag}
                </Link>
            ))}
        </TagsBlock>
    );
};

export default Tags;
