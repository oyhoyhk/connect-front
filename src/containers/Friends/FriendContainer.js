import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from '../../../node_modules/react-router/index';
import Friend from '../../components/Friends/Friend';
import { setOtherToChat } from '../../modules/chatting';

const FriendContainer = ({ receiver, profileImage, nickname, tags, type }) => {
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
      clickOptions={clickOptions}
      optionBox={optionBox}
      type={type}
      nickname={nickname}
      tags={tags}
      profileImage={profileImage}
      receiver={receiver}
      onChatting={onChatting}
    />
  );
};

export default FriendContainer;
