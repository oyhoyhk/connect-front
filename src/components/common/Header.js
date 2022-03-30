import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import NoticeList from './NoticeList';
const HeaderBlock = styled.div`
  width: 100vw;
  height: 80px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderContents = styled.div`
  width: 800px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.7rem;
`;
const ButtonLink = styled(Link)`
  width: 80px;
  height: 40px;
  border-radius: 10px;
  background: ${palette.blue[0]};
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  text-decoration: none;
`;
const Button = styled.div`
  width: 80px;
  height: 40px;
  border-radius: 10px;
  background: ${palette.blue[0]};
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
`;
const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Nickname = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-right: 20px;
`;
const NoticeContainer = styled.div`
  width: 35px;
  height: 35px;
  margin-right: 10px;
  background-size: 80% 80%;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  ${(props) =>
    props.notice
      ? `background-image: url('/img/notice_on.png'); cursor:pointer;`
      : `background-image:url('/img/notice_off.png');`}
`;
const Notice = styled.div`
  width: 19px;
  height: 19px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: red;
  color: white;
  position: absolute;
  font-size: 0.5rem;
  right: -3px;
  bottom: -3px;
`;
const Header = ({ noticeList, toggleNoticeList, user, onLogout, messages }) => {
  return (
    <HeaderBlock>
      <HeaderContents>
        <Link to="/" className="logo">
          CONNECT
        </Link>
        {user ? (
          <InfoBox>
            <Nickname>{user.nickname}</Nickname>
            <NoticeContainer
              onClick={toggleNoticeList}
              notice={messages ? messages.length : 0}
            >
              {messages && messages.length !== 0 ? (
                <Notice>{messages ? messages.length : 0} </Notice>
              ) : (
                ''
              )}
              {messages && messages.length !== 0 && noticeList ? (
                <NoticeList uid={user.uid} messages={messages} />
              ) : (
                ''
              )}
            </NoticeContainer>

            <Button onClick={onLogout}>로그아웃</Button>
          </InfoBox>
        ) : (
          <ButtonLink to="/login">로그인</ButtonLink>
        )}
      </HeaderContents>
    </HeaderBlock>
  );
};

export default Header;
