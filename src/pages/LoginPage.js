import React from 'react';
import Helmet from '../../node_modules/react-helmet/lib/Helmet';
import LoginContainer from '../containers/auth/LoginContainer';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>CONNECT - 로그인</title>
      </Helmet>
      <LoginContainer />
    </>
  );
};

export default LoginPage;
