import React, { useEffect } from 'react';
import styled from 'styled-components';
import ChattingInputContainer from '../../containers/Chatting/ChattingInputContainer';
import FriendsListContainer from '../../containers/Friends/FriendsListContainer';
import ChattingLogs from './ChattingLogs';
import ChattingNotAvailable from './ChattingNotAvailable';

const ChattingBlock = styled.div`
  width: 800px;
  margin: 0 auto;
  height: 650px;
  display: flex;
  justify-content: space-between;
`;

const ConversationBlock = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const OtherInfo = styled.div`
  display: flex;
  justify-content: center;
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

const Chatting = ({ other, logs, changeScroll }) => {
  return (
    <ChattingBlock>
      <FriendsListContainer />
      {other ? (
        <ConversationBlock>
          <OtherInfo>
            <ConversationTitle>
              {other.nickname}
              <OtherProfileImage profileImage={other.profileImage} />
            </ConversationTitle>
          </OtherInfo>
          <ConversationContainer>
            <ChattingLogs
              changeScroll={changeScroll}
              logs={logs[other.receiver]}
              other={other}
            />
            <ChattingInputContainer receiver={other.receiver} />
          </ConversationContainer>
        </ConversationBlock>
      ) : (
        <ChattingNotAvailable />
      )}
    </ChattingBlock>
  );
};

export default Chatting;