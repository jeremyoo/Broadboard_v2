import React from 'react';
import HeaderContainer from '../../containers/common/HeaderContainer';

const Layout = ({ children}) => {
    return (
        <>
            <HeaderContainer />
            <div id="content">
                {children}
            </div>
        </>
    )
};

export default Layout;