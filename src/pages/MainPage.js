import React from 'react';
import Helmet from '../../node_modules/react-helmet/lib/Helmet';
import ChatHallContainer from '../containers/common/ChatHallContainer';
import HeaderContainer from '../containers/common/HeaderContainer';

const MainPage = () => {
  return (
    <>
      <Helmet>
        <title>CONNECT - 그룹 채팅</title>
      </Helmet>
      <HeaderContainer />
      <ChatHallContainer />
    </>
  );
};

export default MainPage;
