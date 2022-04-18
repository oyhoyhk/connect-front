import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  openChatting,
  requestChattingLogs,
  setOtherToChat,
  startLoading,
} from '../../modules/chatting';

const ChatInfoBlock = styled.div`
  border-bottom: 1px solid #cdcdcd;
  width: 98%;
  height: 60px;
  margin: 0 auto;
  padding: 3px;
  border-radius: 5px;
  position: relative;
  &:last-child {
    border: none;
  }
  display: flex;
  align-items: center;
  &:hover {
    background: #cdf1ff;
  }
  cursor: pointer;
`;
const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid #73b2ff;
  border-radius: 10px;
  margin-right: 7px;
  background-size: 100% 100%;
  ${({ profileImage }) =>
    profileImage
      ? `background-image : url(${profileImage});`
      : `background-image : url('/img/default_profile.jpg');`}
`;

const ChatName = styled.div`
  background: #73b2ff;
  max-width: 20%;
  overflow: hidden;
  color: white;
  padding: 10px;
  border-radius: 10px;
  margin-right: 7px;
`;

const LastMessage = styled.div`
  border: 2px solid pink;
  background: white;
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
`;
const Time = styled.div`
  color: gray;
  letter-spacing: 0.1;
  font-size: 0.7rem;
  margin-top: 20px;
`;

const NewMessages = styled.div`
  width: 25px;
  height: 25px;
  background: #ff6f6f;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  font-size: 0.7rem;
  position: absolute;
  right: 1%;
  top: 10%;
`;

const ChatInfo = ({
  nickname,
  profileImage,
  chat_name,
  last_message,
  created_at,
  uid,
  new_messages,
}) => {
  function time(time) {
    const today = new Date();
    time = new Date(time);

    let year = today.getFullYear() - time.getFullYear();
    if (year !== 0) {
      return `${year}년 전`;
    }
    let month = today.getMonth() - time.getMonth();
    if (month !== 0) {
      return `${month}달 전`;
    }
    let day = today.getDate() - time.getDate();
    if (day !== 0) {
      return `${day}일 전`;
    }
    let meridiem = time.getHours() < 12 ? '오전 ' : '오후 ';
    let hour = time.getHours();
    if (hour === 0) hour = 12;
    if (hour > 12) hour -= 12;

    return meridiem + hour + '시 ' + time.getMinutes() + '분';
  }
  const dispatch = useDispatch();
  const chatOn = () => {
    const sender = JSON.parse(localStorage.user).uid;
    dispatch(openChatting());
    const data = { receiver: uid, nickname, profileImage };
    dispatch(setOtherToChat(data));
    dispatch(startLoading());
    dispatch(requestChattingLogs({ sender, receiver: uid }));
  };

  return (
    <ChatInfoBlock onClick={chatOn}>
      <ProfileImage profileImage={profileImage} />
      <ChatName title={chat_name ? chat_name : nickname}>
        {chat_name ? chat_name.slice(0, 5) : nickname.slice(0, 5)}
      </ChatName>
      <LastMessage title={last_message}>
        {last_message.slice(0, 15)}
      </LastMessage>
      <Time>{time(created_at)}</Time>
      {new_messages !== 0 ? (
        <NewMessages>{new_messages >= 100 ? '100+' : new_messages}</NewMessages>
      ) : (
        ''
      )}
    </ChatInfoBlock>
  );
};

export default ChatInfo;
