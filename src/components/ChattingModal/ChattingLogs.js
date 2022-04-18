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
const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoadingImage = styled.div`
  width: 80px;
  height: 80px;
  background-size: 100% 100%;
  background-image: url('/img/loading.gif');
`;
const ChattingLogs = ({ loading, logs, other, changeScroll }) => {
  const scrollBox = useRef();
  useEffect(() => {
    if (!loading) {
      changeScroll(scrollBox.current);
    }
  }, [scrollBox, changeScroll, logs, loading]);
  return (
    <ChattingLogsBlock>
      {loading ? (
        <Loading>
          <LoadingImage />
        </Loading>
      ) : (
        <ChattingScrollContainer ref={scrollBox}>
          {logs &&
            logs.map(({ msg, type, time }, idx) => (
              <ChatMessage
                key={idx}
                type={type}
                nickname={other.nickname}
                msg={msg}
                time={time}
              />
            ))}
        </ChattingScrollContainer>
      )}
    </ChattingLogsBlock>
  );
};

export default ChattingLogs;
