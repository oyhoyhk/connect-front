import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecommendList from '../../components/Friends/RecommendList';
import {
  getRecommend,
  friendRequest,
  addMessageWhenFriendRequest,
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
    dispatch(friendRequest({ sender, receiver }));
    dispatch(addMessageWhenFriendRequest(receiver));
  };
  return (
    <RecommendList
      friendRequest={requestFriendEnrollment}
      recommendList={recommendList}
      onRefresh={onRefresh}
    />
  );
};

export default RecommendContainer;
