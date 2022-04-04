import React, { useState } from 'react';
import ChattingInput from '../../components/Chatting/ChattingInput';

const ChattingInputContainer = () => {
  const [textArea, setTextArea] = useState('');
  const onPressEnter = (e) => {
    if (e.key === 'Enter') {
      onSubmit(e);
    }
  };
  const onChange = (e) => {
    setTextArea(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setTextArea('');
  };
  return (
    <ChattingInput
      onSubmit={onSubmit}
      onPressEnter={onPressEnter}
      onChange={onChange}
      text={textArea}
    />
  );
};
export default ChattingInputContainer;
