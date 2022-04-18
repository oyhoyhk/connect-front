import React from 'react';
import styled from 'styled-components';
import RecommendContainer from '../../containers/Friends/RecommendContainer';
import ChatInfo from './ChatInfo';

const ChattingListBlock = styled.div`
  width: 800px;
  height: 650px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const ChatListBox = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;
const ChatListTitle = styled.div`
  color: white;
  background: #73b2ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 7px 15px;
`;
const ChatListContainer = styled.div`
  width: 100%;
  border: 2px solid #73b2ff;
  border-radius: 10px;
  height: 580px;
  padding: 5px;
`;
const ChatListScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 6px;
    height: 8px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    width: 6px;
    height: 8px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.4);
  }
`;
const ChattingList = ({ chattingList }) => {
  return (
    <ChattingListBlock>
      <ChatListBox>
        <ChatListTitle>채팅 목록</ChatListTitle>
        <ChatListContainer>
          <ChatListScrollContainer>
            {chattingList.map((chat) => (
              <ChatInfo key={chat.uid} {...chat} />
            ))}
          </ChatListScrollContainer>
        </ChatListContainer>
      </ChatListBox>
      <RecommendContainer />
    </ChattingListBlock>
  );
};

export default ChattingList;
