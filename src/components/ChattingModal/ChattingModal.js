import React, { useEffect } from 'react';
import styled from 'styled-components';
import ChattingInputContainer from '../../containers/ChattingModal/ChattingInputContainer';
import FriendsListContainer from '../../containers/Friends/FriendsListContainer';
import ChattingLogs from './ChattingLogs';
import ChattingNotAvailable from './ChattingNotAvailable';

const ChattingBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
`;
const ChattingBlock = styled.div`
  width: 450px;
  height: 600px;
  background: white;
`;

const ConversationBlock = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const OtherInfo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;
const OtherProfileImage = styled.div`
  width: 50px;
  height: 50px;
  border: 2px solid #73b2ff;
  position: absolute;
  left: -100%;
  border-radius: 10px;
  background-size: 100% 100%;
  ${({ profileImage }) =>
    profileImage
      ? `background-image : url(${profileImage});`
      : `background-image : url('/img/default_profile.jpg');`}
`;
const ConversationTitle = styled.div`
  background: #73b2ff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 30px;
  border-radius: 10px;
  height: 21px;
  position: relative;
`;
const ConversationContainer = styled.div`
  width: 100%;
  height: 580px;
  border: 2px solid #73b2ff;
  border-radius: 10px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ChattingModal = ({ exitChatting, other, logs, changeScroll }) => {
  console.log(other);
  const stop = (e) => e.stopPropagation();
  return (
    <ChattingBackground onClick={exitChatting}>
      <div onClick={stop}>
        <OtherInfo>
          <ConversationTitle>
            {other.nickname}
            {other.profileImage && (
              <OtherProfileImage profileImage={other.profileImage} />
            )}
          </ConversationTitle>
        </OtherInfo>
        <ChattingBlock>
          <ChattingLogs logs={logs} other={other} changeScroll={changeScroll} />
          <ChattingInputContainer receiver={other.receiver} />
        </ChattingBlock>
      </div>
    </ChattingBackground>
  );
};

export default ChattingModal;
