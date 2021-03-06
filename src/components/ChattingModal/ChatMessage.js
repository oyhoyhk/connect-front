import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const ChatMessageBlock = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  ${({ received }) =>
    received &&
    css`
      justify-content: flex-start;
    `}
  ${({ send }) =>
    send &&
    css`
      justify-content: flex-end;
    `}
`;

const ChatMessageBox = styled.div`
  display: flex;
  width: 100%;
  ${({ type }) =>
    type === 'received' &&
    css`
      text-align: left;
      color: blue;
    `}
  ${({ type }) =>
    type === 'send' &&
    css`
      text-align: right;
      color: #a30000;
      justify-content: flex-end;
    `}
`;
const Nickname = styled.div`
  color: white;
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #73b2ff;
`;
const Text = styled.div`
  line-height: 1rem;
  padding: 10px;
  margin-bottom: 10px;
  word-wrap: break-word;
  max-width: 50%;
  ${({ type }) =>
    type === 'received' &&
    css`
      background: #d0f8ff;
      border-radius: 15px;
    `}

  ${({ type }) =>
    type === 'send' &&
    css`
      border: 1.5px solid brown;
      background: #ffe3e7;
      border-radius: 15px;
    `}
`;
const TimeBlock = styled.div`
  color: gray;
  font-size: 0.75rem;
  display: flex;
  align-items: flex-end;
  padding-bottom: 10px;
  margin: 0 5px;
`;

const Time = ({ time }) => {
  const timeToString = (time) => {
    const messageTime = new Date(time);
    const now = new Date();
    let str = '';
    let result = [];

    if (messageTime.getFullYear() !== now.getFullYear())
      str += messageTime.getFullYear() + '년 ';
    if (messageTime.getDate() !== now.getDate()) {
      str += `${messageTime.getMonth() + 1}월 ${messageTime.getDate()}일`;
      result.push(str);
      str = '';
    }
    if (messageTime.getHours() === 0) str += '오전 12시 ';
    else if (messageTime.getHours() === 12) str += '오후 12시 ';
    else if (messageTime.getHours() < 12)
      str +=
        '오전 ' +
        (messageTime.getHours() < 10
          ? '0' + messageTime.getHours() + '시 '
          : messageTime.getHours() + '시 ');
    else
      str +=
        '오후 ' +
        (messageTime.getHours() - 12 < 10
          ? '0' + (messageTime.getHours() - 12) + '시 '
          : messageTime.getHours() - 12 + '시 ');

    str +=
      messageTime.getMinutes() < 10
        ? '0' + messageTime.getMinutes() + '분'
        : messageTime.getMinutes() + '분';
    result.push(str);
    return result;
  };
  const [result] = useState(timeToString(time));
  return result.length === 2 ? (
    <TimeBlock>
      {result[0]}
      <br />
      {result[1]}
    </TimeBlock>
  ) : (
    <TimeBlock>{result[0]}</TimeBlock>
  );
};

const ChatMessage = ({ type, nickname, msg, time }) => {
  return (
    <ChatMessageBlock type={type}>
      <ChatMessageBox type={type}>
        {type === 'received' ? <Nickname>{nickname}</Nickname> : ''}
        {type === 'send' ? <Time time={time} /> : ''}
        <Text type={type}>{msg}</Text>
        {type === 'received' ? <Time time={time} /> : ''}
      </ChatMessageBox>
    </ChatMessageBlock>
  );
};

export default ChatMessage;
