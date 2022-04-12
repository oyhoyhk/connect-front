import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { setOtherToChat } from '../../modules/chatting';
import ChatMessage from './ChatMessage';

const ChattingLogsBlock = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const ChattingScrollContainer = styled.div`
  padding: 10px;
  overflow-y: auto;
  height: 100%;
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

const ChattingLogs = ({ logs, other, changeScroll }) => {
  const scrollBox = useRef();
  useEffect(() => {
    changeScroll(scrollBox.current);
  }, [scrollBox, changeScroll, logs]);
  return (
    <ChattingLogsBlock>
      <ChattingScrollContainer ref={scrollBox}>
        {logs &&
          logs.map(({ message, type, time }, idx) => (
            <ChatMessage
              key={idx}
              type={type}
              nickname={other.nickname}
              msg={message}
              time={time}
            />
          ))}
      </ChattingScrollContainer>
    </ChattingLogsBlock>
  );
};

export default ChattingLogs;
