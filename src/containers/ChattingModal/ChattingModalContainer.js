import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChattingModal from '../../components/ChattingModal/ChattingModal';
import {
  closeChat,
  closeChatting,
  initializeOther,
} from '../../modules/chatting';

const ChattingModalContainer = () => {
  const changeScroll = useCallback((e) => {
    e.scrollTop = e.scrollHeight;
  }, []);
  const { other, loading, logs } = useSelector(
    ({ chatting: { loading, other, logs } }) => ({
      other,
      logs,
      loading,
    }),
  );
  const dispatch = useDispatch();
  const exitChatting = (e) => {
    e.stopPropagation();
    const { uid } = JSON.parse(localStorage.user);
    dispatch(closeChat({ sender: uid, receiver: other.receiver }));
    dispatch(closeChatting());
  };
  useEffect(() => {
    return () => {
      dispatch(initializeOther());
    };
  }, [dispatch]);
  return (
    <ChattingModal
      loading={loading}
      exitChatting={exitChatting}
      other={other}
      changeScroll={changeScroll}
      logs={logs}
    />
  );
};

export default ChattingModalContainer;
