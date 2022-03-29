import React, { useCallback, useEffect, useState } from 'react';
import ChatHall from '../../components/common/ChatHall';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../lib/sockets/chatHallSocket';
import {
  getGuestNumber,
  sendMessage,
  receiveMessage,
  setUserList,
  getUserInfo,
  setChatHall,
  leaveChatHall,
  someoneLeft,
  someoneInOut,
  initializeChatHall,
} from '../../modules/chatHall';

const ChatHallContainer = () => {
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();

  const { user, userList, msgList } = useSelector(({ chatHall, user }) => ({
    user: user.user !== null ? user.user : chatHall.user,
    userList: chatHall.userList,
    msgList: chatHall.msgList,
  }));

  useEffect(() => {
    if (!user && !localStorage.chatHall) {
      dispatch(getGuestNumber());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (localStorage.chatHall) {
      dispatch(setChatHall(JSON.parse(localStorage.chatHall)));
      dispatch(getUserInfo());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && !localStorage.chatHall) {
      socket.emit(
        'enter',
        {
          username: user.username,
          nickname: user.nickname,
          profileImage: user.profileImage,
        },
        (response) => {
          if (response === 'success') {
            localStorage.setItem('chatHall', JSON.stringify(user));
          }
        },
      );
      const onBeforeUnload = (e) => {
        dispatch(leaveChatHall({ username: user.username }));
        localStorage.removeItem('chatHall');
      };
      window.addEventListener('beforeunload', onBeforeUnload);
    }
  }, [dispatch, user]);

  useEffect(() => {
    socket.on('broadcastMsg', (data) => {
      dispatch(receiveMessage({ received: true, ...data }));
    });
    socket.on('someone_entered', (data) => {
      dispatch(setUserList(data));
      dispatch(
        someoneInOut({
          action: 'in',
          nickname: data[data.length - 1].nickname,
        }),
      );
    });
    socket.on('someone_left', (data) => {
      console.log('someone_left, data : ', data);
      dispatch(someoneLeft(data));
      dispatch(someoneInOut({ action: 'out', nickname: data }));
    });
    return () => {
      if (localStorage.chatHall) {
        const { username } = JSON.parse(localStorage.chatHall);
        localStorage.removeItem('chatHall');
        socket.removeAllListeners();
        dispatch(leaveChatHall({ username }));
        dispatch(initializeChatHall());
      }
    };
  }, [dispatch]);

  const onChange = (e) => {
    setMsg(e.target.value);
  };

  const changeScroll = useCallback((e) => {
    e.scrollTop = e.scrollHeight;
  }, []);

  const onSubmit = () => {
    if (msg === '') return;
    socket.emit('msg', { nickname: user.nickname, msg: msg.trim() });
    dispatch(
      sendMessage({ send: true, nickname: user.nickname, msg: msg.trim() }),
    );
    setMsg('');
  };

  const onKeySubmit = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
      setMsg('');
    }
  };

  return (
    <ChatHall
      changeScroll={changeScroll}
      msg={msg}
      onChange={onChange}
      onSubmit={onSubmit}
      onKeySubmit={onKeySubmit}
      msgList={msgList}
      userList={userList}
    />
  );
};

export default ChatHallContainer;
