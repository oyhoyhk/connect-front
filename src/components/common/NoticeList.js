import React from 'react';
import styled from 'styled-components';
import { css } from '../../../node_modules/styled-components/dist/styled-components.cjs';

const NoticeListBlock = styled.div`
  position: absolute;
  right: 17%;
  top: 8%;
  border: 3px solid black;
  border-radius: 10px;
  width: 300px;
  background: white;
  font-size: 1rem;
`;
const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px;
  height: 70px;
`;
const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid black;
  border-radius: 10px;
  background-size: 100% 100%;

  ${({ profileImage }) =>
    profileImage
      ? `background-image : url(${profileImage});`
      : `background-image : url('/img/default_profile.jpg');`}
`;
const Text = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  margin: 5px 10px;
  outline: none;
  width: 60px;
  height: 30px;
  border-radius: 10px;
  border: none;
  color: white;
  font-size: 0.85rem;
  cursor: pointer;
`;

const Accept = styled(Button)`
  border: 2px solid #0780ff;
  background: #73b2ff;
`;
const Refuse = styled(Button)`
  border: 2px solid #ff6f88;
  background: pink;
`;
const NoticeList = ({ messages }) => {
  console.log(messages);
  return (
    <NoticeListBlock>
      {messages.map(({ uid, profileImage, nickname }) => (
        <Message key={uid}>
          <ProfileImage profileImage={profileImage} />
          <Text>
            <div>
              <b>{nickname}</b>님이 친구 요청을 했습니다.
            </div>
            <ButtonContainer>
              <Accept>수락</Accept>
              <Refuse>거절</Refuse>
            </ButtonContainer>
          </Text>
        </Message>
      ))}
    </NoticeListBlock>
  );
};

export default NoticeList;
