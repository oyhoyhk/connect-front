import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import Navigation from '../../components/common/Navigation';
import { removeAuth } from '../../modules/auth';
import { initializeChatHall, leaveChatHall } from '../../modules/chatHall';
import {
  friendsRequestAccepted,
  getRecommend,
  receiveMessage,
  requestMessagesList,
} from '../../modules/friends';
import { logout } from '../../modules/user';
import { socket } from '../../lib/sockets/chatHallSocket';
import { useNavigate } from '../../../node_modules/react-router/index';
const HeaderContainer = () => {
  const { user, messages } = useSelector(({ user, friends }) => ({
    user: user.user,
    messages: friends.messagesList,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState(false);
  const toggleNoticeList = useCallback(() => {
    setNoticeList(!noticeList);
  }, [noticeList]);
  const onLogout = () => {
    dispatch(logout());
    dispatch(removeAuth());
    if (localStorage.chatHall) {
      dispatch(leaveChatHall({ username: user.username }));
      dispatch(initializeChatHall());
      localStorage.removeItem('chatHall');
    }
    navigate('/');
  };

  useEffect(() => {
    if (user) {
      const { uid } = user;
      dispatch(requestMessagesList({ uid }));
      socket.on('friend_request', (data) => {
        console.log(data);
        dispatch(receiveMessage(data));
      });
      socket.on('friend_request_accepted', (data) => {
        dispatch(friendsRequestAccepted(data));
        dispatch(getRecommend({ filter: user.tags, uid: user.uid }));
      });
    }
    return () => {
      socket.off();
    };
  }, [dispatch, user]);
  useEffect(() => {});
  return (
    <>
      <Header
        noticeList={noticeList}
        toggleNoticeList={toggleNoticeList}
        user={user}
        onLogout={onLogout}
        messages={messages}
      />
      {user ? <Navigation /> : ''}
    </>
  );
};

export default HeaderContainer;
