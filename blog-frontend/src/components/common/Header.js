import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom';

const HeaderBlock = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
        font-size: 1.125rem;
        font-weight: 800;
        letter-spacing: 2px;
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

const Header = ({ user, onLogout }) => {

    return (
        <HeaderBlock>
            <Wrapper>
                <Link to='/' onClick={() => window.scrollTo(0, 0)} className="logo">
                    BroadBoard
                </Link>
                {user ? (
                    <div className='right'>
                        <UserInfo>{user.nickname}</UserInfo>
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

export default Header;
