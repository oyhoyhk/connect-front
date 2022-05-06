import React from 'react';
import styled from 'styled-components';
import { Link } from '../../../node_modules/react-router-dom/index';
import palette from '../../lib/styles/palette';
import Background from '../common/Background';

const Title = styled.h1`
  text-align: center;
  margin-bottom: 50px;
`;
const Register = styled.form`
  width: 400px;
  height: 400px;
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
  height: 45%;
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
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 70%;
  height: 25%;
`;

const RegisterButton = styled.button`
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
const LoginButton = styled.button`
  width: 30%;
  outline: none;
  border: none;
  background: none;
  font-size: 1.125rem;
  color: #acacac;
  cursor: pointer;
`;

const RegisterForm = ({ error, form, onChange, onSubmit }) => {
  return (
    <Background onSubmit={onSubmit}>
      <Title>회원 가입</Title>
      <Register>
        <InputBox>
          <StyledInput
            onChange={onChange}
            name="username"
            type="text"
            placeholder="아이디"
            maxLength="10"
            value={form.username}
          />
          <StyledInput
            onChange={onChange}
            name="password"
            type="password"
            placeholder="비밀번호"
            maxLength="8"
            value={form.password}
          />
          <StyledInput
            onChange={onChange}
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호 확인"
            maxLength="8"
            value={form.passwordConfirm}
          />
        </InputBox>
        <ErrorBox>{error}</ErrorBox>
        <ButtonBox>
          <RegisterButton>회원가입</RegisterButton>
          <Link to="/" style={{ width: '100%', textAlign: 'right' }}>
            <LoginButton>돌아가기</LoginButton>
          </Link>
        </ButtonBox>
      </Register>
    </Background>
  );
};

export default RegisterForm;
