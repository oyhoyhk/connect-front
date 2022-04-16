import React from 'react';
import styled from 'styled-components';

const ChattingInputBlock = styled.form`
  margin-top: 15px;
  width: 100%;
  display: flex;
  flex: 1;
`;
const ChattingInputLeftBox = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const ChattingArea = styled.textarea`
  resize: none;
  height: 60%;
  border: none;
  outline: none;
  background: #fafafa;
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
const ChattingContentsArea = styled.div`
  display: flex;
  margin-top: 3px;
  align-items: center;
`;
const Icon = styled.div`
  width: 25px;
  height: 25px;
  margin-right: 10px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
`;
const Emoticon = styled(Icon)`
  background-image: url('/img/Emoticon.png');
`;
const Picture = styled(Icon)`
  background-image: url('/img/Picture.svg');
`;
const File = styled(Icon)`
  background-image: url('/img/Clip.png');
`;
const ChattingInputRightBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10px;
  width: 20%;
  height: 100%;
`;

const Submit = styled.button`
  background: #73b2ff;
  color: white;
  outline: none;
  border: none;
  border-radius: 10px;
  padding: 8px 15px;
  letter-spacing: 2px;
  cursor: pointer;
  text-align: center;
`;

const ChattingInput = ({ onSubmit, onChange, onPressEnter, text }) => {
  return (
    <ChattingInputBlock onSubmit={onSubmit}>
      <ChattingInputLeftBox>
        <ChattingArea
          value={text}
          onChange={onChange}
          onKeyPress={onPressEnter}
        />
        <ChattingContentsArea>
          <Emoticon />
          <Picture />
          <File />
        </ChattingContentsArea>
      </ChattingInputLeftBox>
      <ChattingInputRightBox>
        <Submit type="submit">전송</Submit>
      </ChattingInputRightBox>
    </ChattingInputBlock>
  );
};

export default ChattingInput;
