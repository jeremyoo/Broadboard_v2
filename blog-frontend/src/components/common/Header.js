import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import Logo from './Logo';
import { Link, withRouter } from 'react-router-dom';

const HeaderBlock = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    background: var(--brightest-white);
    ${props => props.scrollDown && css`
        transform: translateY(-4.5rem);
        transition: var(--transition);
    `}
    ${props => props.scrollUp && css`
        box-shadow: rgb(0 0 0 / 6%) 0px 0px 16px;
        transform: translateY(0rem);
        transition: var(--transition);
    `}
`;

const Wrapper = styled(Responsive)`
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logoBlock {
        display: flex;
        align-items: center;
        font-size: var(--ft-xxl);
        font-weight: bold;
        color: var(--lightest-navy);
        letter-spacing: 2px;
        .homeLogo {
            display: flex;
            align-items: center;
        }
        .logotitle {
            margin-left: 0.4rem;
        }
    }
    .right {
        display: flex;
        align-items: center;
    }
`;

const UserInfo = styled.div`
    font-weight: 800;
    margin-right: 1rem;
`;

const Header = ({ user, onLogout, scrollDown, scrollUp, onChangeProfile, profile, tag }) => {

    return (
        <HeaderBlock scrollDown={scrollDown} scrollUp={scrollUp}>
            <Wrapper>
                <div className='logoBlock'>
                    {(profile !== '' || tag !== '') ? (
                        <div className='viewerLogo'>
                            <Link to='/' onClick={() => window.scrollTo(0, 0)} ><Logo /></Link>
                            {((profile && !tag) &&
                                <Link to={`/@${profile}`} onClick={() => {window.scrollTo(0, 0); onChangeProfile(profile);} } className='logotitle' >.{profile}</Link> 
                            )}
                            {((tag && !profile) &&
                                <Link to={`/tags/${tag}`} onClick={() => window.scrollTo(0, 0)} className='logotitle' >.#{tag}</Link>
                            )}
                        </div>
                    ):(
                        <Link to='/' onClick={() => window.scrollTo(0, 0)} className='homeLogo'>
                            <Logo />
                            <div className='logotitle'>roadBoard</div>
                        </Link>
                    )}
                </div>

                {user ? (
                    <div className='right'>
                        <UserInfo>{user.profile}</UserInfo>
                        <Button onClick={onLogout} >Log out</Button>
                    </div>
                ) : (
                    <div className="right">
                        <Button to='/login'>Log in</Button>
                    </div>
                )}
            </Wrapper>
        </HeaderBlock>
    );
};

export default withRouter(Header);
