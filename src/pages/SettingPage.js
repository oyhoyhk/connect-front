import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import Helmet from '../../node_modules/react-helmet/lib/Helmet';
import SettingContainer from '../containers/Setting/SettingContainer';
const SettingPage = () => {
  return (
    <>
      <Helmet>
        <title>CONNECT - 개인 설정</title>
      </Helmet>
      <HeaderContainer />
      <SettingContainer />
    </>
  );
};

export default SettingPage;
