import React from 'react';
import styled from 'styled-components';
import { Link } from '../../../node_modules/react-router-dom/index';
import palette from '../../lib/styles/palette';
import Background from '../common/Background';

const Title = styled.h1`
  text-align: center;
  margin-bottom: 50px;
`;
const Login = styled.form`
  width: 400px;
  height: 350px;
  border-radius: 20px;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  flex-direction: column;
`;
const InputBox = styled.div`
  width: 80%;
  height: 35%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;
const StyledInput = styled.input`
  width: 80%;
  height: 10%;
  border: none;
  outline: none;
  border-bottom: 1px solid black;
  padding: 15px;
  font-size: 1.25rem;
`;

const ErrorBox = styled.div`
  margin-top: 20px;
  width: 100%;
  text-align: center;
  color: red;
`;

const ButtonBox = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 70%;
  height: 25%;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 50px;
  outline: none;
  border: 3px solid ${palette.blue[2]};
  color: ${palette.blue[2]};
  border-radius: 5px;
  font-size: 1.5rem;
  font-weight: bold;
  background: none;
  cursor: pointer;
`;
const RegisterButton = styled.button`
  width: 30%;
  outline: none;
  border: none;
  background: none;
  font-size: 1.125rem;
  color: #acacac;
  cursor: pointer;
`;

const LoginForm = ({ onChange, errorMsg, onSubmit }) => {
  return (
    <Background>
      <Title>Connect에 오신 것을 환영합니다.</Title>
      <Login onSubmit={onSubmit}>
        <InputBox>
          <StyledInput
            name="username"
            type="text"
            placeholder="아이디"
            onChange={onChange}
          />
          <StyledInput
            name="password"
            type="password"
            placeholder="비밀번호"
            onChange={onChange}
          />
        </InputBox>
        {errorMsg ? <ErrorBox>아이디, 비밀번호를 확인해주세요</ErrorBox> : ''}
        <ButtonBox>
          <LoginButton>로그인</LoginButton>
          <Link to="/register" style={{ width: '100%', textAlign: 'right' }}>
            <RegisterButton>회원가입</RegisterButton>
          </Link>
        </ButtonBox>
      </Login>
    </Background>
  );
};

export default LoginForm;
