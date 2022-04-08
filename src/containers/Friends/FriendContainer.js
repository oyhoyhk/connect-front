import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from '../../../node_modules/react-router/index';
import Friend from '../../components/Friends/Friend';
import { setOtherToChat } from '../../modules/chatting';

const FriendContainer = ({
  friendRequest,
  receiver,
  profileImage,
  nickname,
  tags,
  type,
  status,
}) => {
  const [optionBox, setOptionBox] = useState(false);
  const clickOptions = () => {
    setOptionBox(!optionBox);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChatting = () => {
    const data = { receiver, profileImage, nickname, tags };
    dispatch(setOtherToChat(data));
    setOptionBox(false);
    navigate('/chatting');
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
