import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecommendList from '../../components/Friends/RecommendList';
import {
  getRecommend,
  friendRequest,
  addMessageWhenFriendRequest,
  blockUser,
} from '../../modules/friends';

const RecommendContainer = () => {
  const dispatch = useDispatch();
  const { uid, recommendList, tags } = useSelector(
    ({ user, friends: { recommendList, tagList } }) => ({
      recommendList,
      tags: tagList,
      uid: user.user.uid,
    }),
  );
  useEffect(() => {
    dispatch(getRecommend({ filter: tags, uid }));
  }, [dispatch, tags, uid]);

  const onRefresh = () => {
    dispatch(getRecommend({ filter: tags, uid }));
  };
  const requestFriendEnrollment = (receiver) => {
    const sender = JSON.parse(localStorage.user);
    console.log(receiver);
    receiver = { ...receiver, type: 'sendered' };
    dispatch(friendRequest({ sender, receiver: receiver.receiver }));
    dispatch(addMessageWhenFriendRequest(receiver));
  };
  const clickBlockUser = (other) => {
    dispatch(blockUser({ uid, other, tags }));
  };
  return (
    <RecommendList
      friendRequest={requestFriendEnrollment}
      recommendList={recommendList}
      onRefresh={onRefresh}
      clickBlockUser={clickBlockUser}
    />
  );
};

export default RecommendContainer;
