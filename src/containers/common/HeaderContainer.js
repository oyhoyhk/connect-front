import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import Navigation from '../../components/common/Navigation';
import { removeAuth } from '../../modules/auth';
import { initializeChatHall, leaveChatHall } from '../../modules/chatHall';
import {
  friendRequestAccepted,
  friendRequestRefused,
  getRecommend,
  receiveMessage,
  requestMessagesList,
  someoneLogin,
  someoneLogout,
} from '../../modules/friends';
import { logout } from '../../modules/user';
import { socket } from '../../lib/sockets/chatHallSocket';
import { useNavigate } from '../../../node_modules/react-router/index';
import { receiveChatting } from '../../modules/chatting';
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
    dispatch(logout({ uid: user.uid }));
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
        const { info } = data;
        info.time = data.time;
        info.type = 'received';
        dispatch(receiveMessage(info));
      });
      socket.on('friend_request_accepted', (data) => {
        dispatch(friendRequestAccepted(data));
        dispatch(getRecommend({ filter: user.tags, uid: user.uid }));
      });
      socket.on('friend_request_refused', (data) => {
        dispatch(friendRequestRefused(Number(data)));
      });
      socket.on('friend_request_canceled', (data) => {
        dispatch(friendRequestRefused(Number(data)));
      });
      socket.on('someone_logout', (uid) => {
        dispatch(someoneLogout(uid));
      });
      socket.on('someone_login', (uid) => {
        dispatch(someoneLogin(uid));
      });
      socket.on(
        'someone_send_message',
        ({ sender, receiver, message, time }) => {
          console.log('someone_send_message', sender, receiver, message, time);
          dispatch(receiveChatting({ sender, message, time }));
        },
      );
    }
    return () => {
      socket.off();
    };
  }, [dispatch, user]);
  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);
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
