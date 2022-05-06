import React from 'react';
import Helmet from '../../node_modules/react-helmet/lib/Helmet';
import HeaderContainer from '../containers/common/HeaderContainer';
import FriendsContainer from '../containers/Friends/FriendsContainer';

const FriendsPage = () => {
  return (
    <div>
      <Helmet>
        <title>CONNECT - 친구 목록</title>
      </Helmet>
      <HeaderContainer />
      <FriendsContainer />
    </div>
  );
};

export default FriendsPage;
