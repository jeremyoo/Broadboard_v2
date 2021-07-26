import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const buttonStyle = css`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    padding: 0.25rem 1rem;
    outline: none;
    cursor: pointer;
    transition: var(--transition);
    ${props =>
        props.reverse ? css`
            color: var(--lightestest-navy);
            background: none;
            padding: 0.1875rem 0.9375rem;
            border: 1px solid var(--lightestestest-navy);
            border-color: transparent;
            ${props => props.background && css`
                background: var(--${props.background});
            `}
            &:hover {
                background: var(--white);
                padding: 0.1875rem 0.9375rem;
                border: 1px solid var(--lightestestest-navy);
                border-radius: 4px;
            }
        `: css`
            color: var(--brightest-white);
            background: var(--lightestest-navy);
            &:hover {
                background: var(--lightestestest-navy);
            }
        `
    }

    ${props =>
        props.fullWidth &&
        css`
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            width: 100%;
            font-size: 1.125rem;
        `}
    
    ${props =>
        props.cyan &&
        css`
            background: ${palette.cyan[6]};
            &:hover{
                background: ${palette.cyan[4]};
            }
        `
    }

    ${props => 
        props.icon &&
        css`
            padding: 0 0.5rem;
        `
    }

    &:disabled {
        background: ${palette.gray[3]};
        color: ${palette.gray[5]};
        cursor: not-allowed;
    }
`;

const StyledButton = styled.button`
    ${buttonStyle}
`;

const StyledLink = styled(Link)`
    ${buttonStyle}
`;


const Button = props => {
    return props.to ? (
            <StyledLink {...props} 
                cyan={props.cyan ? 1 : 0}
                reverse={props.reverse ? 1 : 0}
                icon={props.icon ? 1 : 0}
            />
        ) : (
            <StyledButton {...props} 
                cyan={props.cyan ? 1 : 0} 
                reverse={props.reverse ? 1 : 0} 
                icon={props.icon ? 1 : 0}
                backurl={props.backurl ? 1: 0}
            />
        );
};

export default Button;
