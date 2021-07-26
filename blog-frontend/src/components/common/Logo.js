import React from 'react';
import styled from 'styled-components';

const LogoBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    border-radius: 0.4rem;
    background-color: var(--lightestest-navy);
    .typo {
        font-size: var(--ft-heading);
        color: var(--brightest-white);
        font-family: Georgia, serif;
        font-weight: bold;

    }
`;

const Logo = () => {
    return (
        <LogoBlock>
            <div className="typo">B</div>
        </LogoBlock>
    );
};

export default Logo;
