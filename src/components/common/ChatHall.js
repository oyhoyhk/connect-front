import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Message from './Message';
import UserList from './UserList';
const ChatHallBlock = styled.div`
  width: 800px;
  height: 500px;
  margin: 50px auto;
  display: flex;
  justify-content: space-between;
`;

const ChatListContainer = styled.div`
  width: 65%;
  height: 100%;
  position: relative;
  border: 1px solid #dfdfdf;
`;
const ChatScrollContainer = styled.div`
  padding: 10px;
  height: 84%;
  overflow-y: auto;
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
const ChatList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  min-height: 100%;
`;
const ChatInputBox = styled.div`
  width: 100%;
  height: 60px;
  position: absolute;
  left: 0;
  bottom: 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(0, 0, 0, 0.03);
  box-shadow: 4px 3px 5px gray;
`;
const ChatInput = styled.input`
  width: 70%;
  height: 25px;
  border-radius: 10px;
  outline: none;
  border: 1px solid black;
  padding-left: 10px;
  padding-right: 10px;
`;
const ChatButton = styled.button`
  width: 50px;
  height: 30px;
  cursor: pointer;
  background: none;
  outline: none;
  border: 2px solid black;
  border-radius: 20px;
  font-size: 1.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatHall = ({
  changeScroll,
  msg,
  msgList,
  onChange,
  onSubmit,
  onKeySubmit,
  userList,
}) => {
  const scrollBox = useRef();
  useEffect(() => {
    changeScroll(scrollBox.current);
  }, [msgList, changeScroll, scrollBox]);
  return (
    <ChatHallBlock>
      <ChatListContainer>
        <ChatScrollContainer ref={scrollBox}>
          <ChatList>
            {msgList.map((props, idx) => (
              <Message {...props} key={idx} />
            ))}
          </ChatList>
        </ChatScrollContainer>
        <ChatInputBox>
          <ChatInput value={msg} onChange={onChange} onKeyPress={onKeySubmit} />
          <ChatButton onClick={onSubmit}>+</ChatButton>
        </ChatInputBox>
      </ChatListContainer>
      <UserList changeScroll={changeScroll} userList={userList} />
    </ChatHallBlock>
  );
};

export default ChatHall;
