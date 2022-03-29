import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import Navigation from '../../components/common/Navigation';
import { removeAuth } from '../../modules/auth';
import { initializeChatHall, leaveChatHall } from '../../modules/chatHall';
import { receiveMessage, requestMessagesList } from '../../modules/friends';
import { logout } from '../../modules/user';
import { socket } from '../../lib/sockets/chatHallSocket';
const HeaderContainer = () => {
  const { user, messages } = useSelector(({ user, friends }) => ({
    user: user.user,
    messages: friends.messagesList,
  }));
  const dispatch = useDispatch();
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
  };

  useEffect(() => {
    if (user) {
      const { uid } = user;
      dispatch(requestMessagesList({ uid }));

      socket.on('friend_request', (data) => {
        console.log(data);
        dispatch(receiveMessage(data));
      });
    }
  }, [dispatch, user]);
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
