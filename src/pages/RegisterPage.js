import React from 'react';
import Helmet from '../../node_modules/react-helmet/lib/Helmet';
import RegisterContainer from '../containers/auth/RegisterContainer';

const RegisterPage = () => {
  return (
    <div>
      <Helmet>
        <title>CONNECT - 회원가입</title>
      </Helmet>
      <RegisterContainer />;
    </div>
  );
};

export default RegisterPage;
