import React from 'react';
import { useSelector } from 'react-redux';
import AuthContainer from '../../containers/auth/AuthContainer';
import { ReactComponent as AuthImage } from '../../lib/img/authImage.svg';
import styled from 'styled-components';

const AuthTemplateBlock = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: var(--navy-shadow);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 15;
`;

const WhiteBox = styled.div`        
    width: 768px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.65);
    background: white;
    border-radius: 2px;
    display: flex;
`

const AuthImageBlock = styled.div`
    width: 50%;
    background: var(--brightest-white);
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--lightest-navy);
    font-size: var(--ft-sm-heading);
    font-weight: bold;
    .authType {
        color: var(--lightestestest-navy);
        font-size: var(--ft-lg-heading);
        text-shadow: 2px 2px var(--lightest-steel);
    }
`;

const AuthTemplate = ({ authOff }) => {

    const { type } = useSelector(({ auth }) => ({
        type: auth.type,
    }))
    return (
        <>
            <AuthTemplateBlock>
                <WhiteBox>
                    <AuthImageBlock>
                        <div className='authImageText'>
                            <div>Hello,</div>
                            <div><div className='authType'>{type}</div> to broadboard!</div>
                        </div>
                        <AuthImage width="110%" height="275px"></AuthImage>
                    </AuthImageBlock>
                    <AuthContainer authOff={authOff} type={type} />
                </WhiteBox>
            </AuthTemplateBlock>
        </>
    );
};

export default AuthTemplate;
