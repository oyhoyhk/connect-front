import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const MessageContainer = styled.div`
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
const MessageBlock = styled.div`
  display: flex;
  width: 100%;
  ${(props) =>
    props.received &&
    css`
      text-align: left;
      color: blue;
    `}
  ${(props) =>
    props.send &&
    css`
      text-align: right;
      color: red;
      justify-content: flex-end;
    `}
`;
const Nickname = styled.div`
  color: white;
  background: ${palette.blue[1]};
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Text = styled.div`
  line-height: 1rem;
  padding: 10px;
  margin-bottom: 10px;
  word-wrap: break-word;
  max-width: 50%;
  ${(props) =>
    props.received &&
    css`
      border: 1.5px solid ${palette.blue[0]};
      background: #d0f8ff;
      border-radius: 15px;
    `}

  ${(props) =>
    props.send &&
    css`
      border: 1.5px solid brown;
      background: pink;
      border-radius: 15px;
    `}
`;

const AlarmMessage = styled.div`
  width: 100%;
  text-align: center;
  background: black;
  color: white;
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;

  ${({ action }) =>
    action === 'in' &&
    css`
      background: #ff8ea2;
    `}

  ${({ action }) =>
    action === 'out' &&
    css`
      background: #429fff;
    `}
`;

const Message = ({ action, idx, send, received, nickname, msg }) => {
  return action ? (
    <AlarmMessage action={action}>
      {nickname}님이 {action === 'in' ? '입장' : '퇴장'}하셨습니다.
    </AlarmMessage>
  ) : (
    <MessageContainer send={send} received={received} key={idx}>
      <MessageBlock send={send} received={received}>
        {received ? <Nickname>{nickname}</Nickname> : ''}
        <Text send={send} received={received}>
          {msg}
        </Text>
      </MessageBlock>
    </MessageContainer>
  );
};

export default Message;
