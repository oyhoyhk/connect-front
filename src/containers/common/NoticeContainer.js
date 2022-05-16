import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Notice from '../../components/common/Notice';
import {
  acceptFriendRequest,
  refuseFriendRequest,
} from '../../modules/friends';

const NoticeContainer = ({ sender, profileImage, nickname, type, time }) => {
  const dispatch = useDispatch();
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    if (localStorage.user) {
      setReceiver(JSON.parse(localStorage.getItem('user')).uid);
    }
  }, []);
  const onAccept = (e) => {
    e.stopPropagation();
    dispatch(acceptFriendRequest({ sender, receiver }));
  };
  const onRefuse = (e) => {
    e.stopPropagation();
    dispatch(refuseFriendRequest({ sender, receiver, type: 'refuse' }));
  };
  const onCancel = (e) => {
    e.stopPropagation();
    // const sender = JSON.parse(localStorage.user).uid;
    dispatch(
      refuseFriendRequest({
        sender: receiver,
        receiver: sender,
        type: 'cancel',
      }),
    );
  };
  return (
    <Notice
      key={sender}
      profileImage={profileImage}
      type={type}
      time={time}
      nickname={nickname}
      onAccept={onAccept}
      onRefuse={onRefuse}
      onCancel={onCancel}
    />
  );
};

export default NoticeContainer;
