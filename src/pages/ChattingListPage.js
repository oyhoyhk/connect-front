import React from 'react';
import Helmet from '../../node_modules/react-helmet/lib/Helmet';
import ChattingListContainer from '../containers/ChattingList/ChattingListContainer';
import HeaderContainer from '../containers/common/HeaderContainer';

const ChattingListPage = () => {
  return (
    <>
      <Helmet>
        <title>CONNECT - 채팅 목록</title>
      </Helmet>
      <HeaderContainer />
      <ChattingListContainer />
    </>
  );
};
export default ChattingListPage;
