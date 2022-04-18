import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from '../../../node_modules/react-router/index';
import ChattingList from '../../components/ChattingList/ChattingList';
import { requestChattingList } from '../../modules/chatting';

const ChattingListContainer = () => {
  const dispatch = useDispatch();
  const { chattingList, chat } = useSelector(
    ({ chatting: { chattingList, chat } }) => ({
      chattingList,
      chat,
    }),
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.user) navigate('/');
    const { uid } = JSON.parse(localStorage.user);

    dispatch(requestChattingList({ uid }));
  }, [dispatch, navigate, chat]);

  return <ChattingList chattingList={chattingList} />;
};

export default ChattingListContainer;
