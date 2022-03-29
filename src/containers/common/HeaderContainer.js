import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import Navigation from '../../components/common/Navigation';
import { removeAuth } from '../../modules/auth';
import { initializeChatHall, leaveChatHall } from '../../modules/chatHall';
import { receiveMessage } from '../../modules/friends';
import { logout } from '../../modules/user';
import { socket } from '../../lib/sockets/chatHallSocket';
const HeaderContainer = () => {
  const { user, messages } = useSelector(({ user, friends }) => ({
    user: user.user,
    messages: friends.messagesList,
  }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(removeAuth());
    if (localStorage.chatHall) {
      console.log('hi');
      dispatch(leaveChatHall({ username: user.username }));
      dispatch(initializeChatHall());
      localStorage.removeItem('chatHall');
    }
  };

  useEffect(() => {
    socket.on('friend_request', (data) => {
      console.log(data);
      dispatch(receiveMessage(data));
    });
  }, [dispatch]);
  return (
    <>
      <Header user={user} onLogout={onLogout} messages={messages} />
      {user ? <Navigation /> : ''}
    </>
  );
};

export default HeaderContainer;
