import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Notice from '../../components/common/Notice';
import {
  acceptFriendRequest,
  refuseFriendRequest,
} from '../../modules/friends';

const NoticeContainer = ({ sender, profileImage, nickname }) => {
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
    dispatch(refuseFriendRequest({ sender, receiver }));
  };
  return (
    <Notice
      key={sender}
      profileImage={profileImage}
      nickname={nickname}
      onAccept={onAccept}
      onRefuse={onRefuse}
    />
  );
};

export default NoticeContainer;
