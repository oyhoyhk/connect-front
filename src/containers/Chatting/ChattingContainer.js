import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chatting from '../../components/Chatting/Chatting';
import { initializeOther } from '../../modules/chatting';

const ChattingContainer = () => {
  const { other } = useSelector(({ chatting: { other } }) => ({ other }));
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(initializeOther());
    };
  }, [dispatch]);
  return <Chatting other={other} />;
};

export default ChattingContainer;
