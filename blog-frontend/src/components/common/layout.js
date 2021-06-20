import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import HeaderContainer from '../../containers/common/HeaderContainer';

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
        // const scrollHeight = document.documentElement.scrollHeight
        // const clientHeight = document.documentElement.clientHeight;
        // if (scrollHeight === clientHeight) { setScrollDown(false); setScrollUp(false); }
        window.addEventListener("scroll", scrollfnc, true);
        return () => window.removeEventListener("scroll", scrollfnc, true);
    }, [scrollfnc])


    return (
        <>
            <HeaderContainer scrollDown={scrollDown} scrollUp={scrollUp} />
            <ContentBlock id="content" ref={scrollRef}>
                {children}
            </ContentBlock>
        </>
    )
};

export default Layout;