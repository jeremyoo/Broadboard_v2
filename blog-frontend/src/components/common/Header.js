import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const HeaderBlock = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
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
            color: var(--lightestest-navy);
        }
    }
    .right {
        display: flex;
        align-items: center;
        .firstChild {
            margin-right: 0.5rem;
        }
    }
`;

const UserInfo = styled.div`
    padding: 0.25rem 1rem;
    margin-right: 1rem;
    color: var(--lightestest-navy);
    cursor: pointer;
`;



const Header = ({ user, onClickLogin, onClickRegister, onLogout, scrollDown, scrollUp, onChangeProfile, profile, tag }) => {

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
                            <Logo className='logo' />
                            <div className='logotitle'>roadBoard</div>
                        </Link>
                    )}
                </div>

                {user ? (
                    <div className='right'>
                        <UserInfo className='firstChild'><Link to={`/@${user.nickname}`}>{user.nickname}</Link></UserInfo>
                        <Button onClick={() => { window.scrollTo(0, 0); onLogout();}} >Log out</Button>
                    </div>
                ) : (
                    <div className='right'>
                        <Button className='firstChild' onClick={onClickLogin} reverse>Log in</Button>
                        <Button onClick={onClickRegister}>Register</Button>
                    </div>
                )}
            </Wrapper>
        </HeaderBlock>
    );
};

export default Header;
