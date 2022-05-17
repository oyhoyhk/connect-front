import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Friend from '../../components/Friends/Friend';
import { requestChattingLogs, startLoading } from '../../modules/chatting';
import { openChatting, setOtherToChat } from '../../modules/chatting';

const FriendContainer = ({
  friendRequest,
  receiver,
  profileImage,
  nickname,
  tags,
  type,
  status,
  clickBlockUser,
  deleteFriend,
}) => {
  const [optionBox, setOptionBox] = useState(false);
  const clickOptions = () => {
    setOptionBox(!optionBox);
  };
  const dispatch = useDispatch();
  const onChatting = () => {
    const data = { receiver, profileImage, nickname };
    dispatch(setOtherToChat(data));
    dispatch(openChatting());
    dispatch(startLoading());
    clickOptions();
    const sender = JSON.parse(localStorage.user).uid;
    dispatch(requestChattingLogs({ sender, receiver }));
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
      clickBlockUser={clickBlockUser}
      deleteFriend={deleteFriend}
    />
  );
};

export default FriendContainer;
