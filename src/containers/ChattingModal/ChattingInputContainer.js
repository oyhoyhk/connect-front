import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ChattingInput from '../../components/ChattingModal/ChattingInput';
import { socket } from '../../lib/sockets/socket';
import { sendChatting } from '../../modules/chatting';

const ChattingInputContainer = ({ receiver }) => {
  const dispatch = useDispatch();
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
    if (textArea === '') return;
    const sender = JSON.parse(localStorage.user).uid;
    socket.emit('someone_send_message', {
      sender,
      receiver,
      message: textArea,
    });
    dispatch(
      sendChatting({
        receiver,
        message: textArea,
        time: new Date(),
      }),
    );
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
