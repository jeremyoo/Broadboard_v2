import React from 'react';
import ProfileContainer from '../containers/profile/ProfileContainer';
import PaginationContainer from '../containers/common/PaginationContainer'
import Layout from '../components/common/Layout'

const ProfileListPage = () => {

    return(
        <Layout >
            <ProfileContainer />
            <PaginationContainer />
        </Layout>
    )
}

export default ProfileListPage;