import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from '../../../node_modules/react-router/index';
import Friend from '../../components/Friends/Friend';
import { requestChattingLogs } from '../../modules/chatting';
import { openChatting, setOtherToChat } from '../../modules/chatting';

const FriendContainer = ({
  friendRequest,
  receiver,
  profileImage,
  nickname,
  tags,
  type,
  status,
}) => {
  const { logs } = useSelector(({ chatting: { logs } }) => ({ logs }));
  const [optionBox, setOptionBox] = useState(false);
  const clickOptions = () => {
    setOptionBox(!optionBox);
  };
  const dispatch = useDispatch();
  const onChatting = () => {
    const data = { receiver, profileImage, nickname, tags };
    console.log(data);
    dispatch(setOtherToChat(data));
    dispatch(openChatting());
    clickOptions();
    if (!logs[receiver]) {
      const sender = JSON.parse(localStorage.user).uid;
      dispatch(requestChattingLogs({ sender, receiver }));
    }
    console.log(logs);
  };
  return (
    <Friend
      friendRequest={friendRequest}
      clickOptions={clickOptions}
      optionBox={optionBox}
      type={type}
      nickname={nickname}
      tags={tags}
      profileImage={profileImage}
      receiver={receiver}
      onChatting={onChatting}
      status={status}
    />
  );
};

export default FriendContainer;
