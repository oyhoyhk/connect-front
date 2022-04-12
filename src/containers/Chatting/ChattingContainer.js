import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chatting from '../../components/Chatting/Chatting';
import { initializeOther } from '../../modules/chatting';

const ChattingContainer = () => {
  const changeScroll = useCallback((e) => {
    e.scrollTop = e.scrollHeight;
  }, []);
  const { other, logs } = useSelector(({ chatting: { other, logs } }) => ({
    other,
    logs,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(initializeOther());
    };
  }, [dispatch]);
  return <Chatting other={other} changeScroll={changeScroll} logs={logs} />;
};

export default ChattingContainer;
