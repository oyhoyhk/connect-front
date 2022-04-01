import React, { useCallback } from 'react';
import styled from 'styled-components';

const NoticeBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 5px 5px 5px;
  height: 80px;
  border-top: 1px solid gray;
  margin: 5px 0;
  &:first-child {
    border-top: none;
  }
`;
const LeftBlock = styled.div`
  width: 50px;
  display: flex;
  flex-direction: column;
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
const Time = styled.div`
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 5px;
  font-size: 0.7rem;
  font-weight: normal;
`;
const Text = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: normal;
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
const Cancel = styled(Button)`
  border: 2px solid gray;
  background: #eeeeee;
  color: #a3a3a3;
`;

const Notice = ({ profileImage, type, time, nickname, onAccept, onRefuse }) => {
  const clickHandler = useCallback((e) => e.stopPropagation(), []);
  return (
    <NoticeBlock onClick={clickHandler}>
      <LeftBlock>
        <ProfileImage profileImage={profileImage} />
        <Time>{time}</Time>
      </LeftBlock>
      {type === 'received' ? (
        <Text>
          <div>
            <b>{nickname}</b>님이 <br />
            친구 요청을 했습니다.
          </div>
          <ButtonContainer>
            <Accept onClick={onAccept}>수락</Accept>
            <Refuse onClick={onRefuse}>거절</Refuse>
          </ButtonContainer>
        </Text>
      ) : type === 'sendered' ? (
        <Text>
          <div>
            <b>{nickname}</b>님에게 <br />
            친구 요청을 했습니다.
          </div>
          <ButtonContainer>
            <Cancel>취소</Cancel>
          </ButtonContainer>
        </Text>
      ) : (
        ''
      )}
    </NoticeBlock>
  );
};

export default Notice;
