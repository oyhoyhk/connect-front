import styled, { css } from 'styled-components';
import React from 'react';

const OptionContainer = styled.div`
  position: absolute;
  display: flex;
  z-index: 2;
  height: 40px;
  border-radius: 12px;
  background: white;
  ${({ type }) =>
    type === 'recommend'
      ? css`
          left: 110%;
          width: 150px;
        `
      : css`
          left: -55%;
          width: 100px;
        `}
`;
const Icon = styled.div`
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 10px;
  margin: 5px;
  cursor: pointer;
`;
const Chat = styled(Icon)`
  background-image: url('/img/chat.png');
  background-size: 80% 80%;
  border: 2px solid #73b2ff;
`;
const Add = styled(Icon)`
  background-image: url('/img/add.png');
  background-size: 60% 60%;
  border: 2px solid #73b2ff;
`;
const Remove = styled(Icon)`
  background-image: url('/img/remove.png');
  background-size: 60% 70%;
  border: 2px solid #ff6e87;
`;
const OptionBox = ({ pid, friendRequest, type }) => {
  return type === 'recommend' ? (
    <OptionContainer type={type}>
      <Chat title="채팅하기" />
      <Add onClick={() => friendRequest(pid)} title="친구추가" />
      <Remove title="관심없음" />
    </OptionContainer>
  ) : (
    <OptionContainer type={type}>
      <Chat title="채팅하기" />
      <Remove title="친구삭제" />
    </OptionContainer>
  );
};

export default OptionBox;
