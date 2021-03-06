import React, { useCallback, useEffect, useState } from 'react';
import ChatHall from '../../components/common/ChatHall';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../lib/sockets/socket';
import {
  getGuestNumber,
  sendMessage,
  receiveMessage,
  setUserList,
  leaveChatHall,
  someoneLeft,
  someoneInOut,
} from '../../modules/chatHall';

const ChatHallContainer = () => {
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();

  const { user, userList, msgList, userInfo } = useSelector(
    ({ chatHall, user: { user } }) => ({
      user: chatHall.user,
      userList: chatHall.userList,
      msgList: chatHall.msgList,
      userInfo: user,
    }),
  );
  useEffect(() => {
    if (!user) {
      dispatch(getGuestNumber());
    } else {
      const info = userInfo || user;

      socket.emit(
        'enter',
        {
          username: info.username,
          nickname: info.nickname,
          profileImage: info.profileImage,
        },
        (response) => {
          if (response === 'success') {
            localStorage.setItem('chatHall', JSON.stringify(info));
          }
        },
      );
    }

    const onBeforeUnload = (e) => {
      const username = userInfo ? userInfo.username : user.username;
      socket.emit('leave_chat_hall', username);
    };
    window.addEventListener('beforeunload', onBeforeUnload);
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
      dispatch(someoneLeft(data));
      dispatch(someoneInOut({ action: 'out', nickname: data }));
    });
    return () => {
      if (user) {
        const username = userInfo ? userInfo.username : user.username;
        socket.emit('leave_chat_hall', username);
      }
      dispatch(leaveChatHall());
      localStorage.removeItem('chatHall');
      socket.removeAllListeners();
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [dispatch, user, userInfo]);

  const onChange = (e) => {
    setMsg(e.target.value);
  };

  const changeScroll = useCallback((e) => {
    e.scrollTop = e.scrollHeight;
  }, []);

  const onSubmit = () => {
    if (msg === '') return;
    const nickname = userInfo ? userInfo.nickname : user.nickname;
    socket.emit('msg', { nickname, msg: msg.trim() });
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
