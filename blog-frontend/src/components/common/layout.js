import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import HeaderContainer from '../../containers/common/HeaderContainer';
import AuthTemplate from '../auth/AuthTemplate';

const ContentBlock = styled.div`
    background-color: var(--brightest-white);
    padding-top: 4.5rem;
`;

const Layout = ({ children}) => {
    const [scrollDown, setScrollDown] = useState(false);
    const [scrollUp, setScrollUp] = useState(false);
    const [prevScroll, setPrevScroll]  = useState(0);

    const scrollRef = useRef();
    const scrollfnc = useCallback(() => {
        const scrollValue = window.scrollY;
        setPrevScroll(scrollValue);
        if (window.scrollY > prevScroll && !scrollDown) { setScrollDown(true); setScrollUp(false); }
        if (window.scrollY < prevScroll && !scrollUp) { setScrollUp(true); setScrollDown(false); }
        if (window.scrollY === 0) setScrollUp(false);
    })
    
    useEffect(() => {
        document.documentElement.style.overflowY = "initial";
        window.addEventListener("scroll", scrollfnc, true);
        return () => window.removeEventListener("scroll", scrollfnc, true);
    }, [scrollfnc])
    
    const [authform, setAuthform] = useState(false)

    useEffect(() => {
        const clientTop = document.documentElement.scrollTop;
        if (authform) {
            document.documentElement.style.overflowY = "hidden";
            document.documentElement.scrollTop = clientTop;
        }
    }, [authform])

    const authOn = () => setAuthform(true);
    const authOff = () => setAuthform(false);

    return (
        <>
            {authform && authform === true && <AuthTemplate authOff={authOff} />}
            <HeaderContainer scrollDown={scrollDown} scrollUp={scrollUp} authOn={authOn} />
            <ContentBlock id="content" ref={scrollRef}>
                {children}
            </ContentBlock>
        </>

    )
};

export default Layout;