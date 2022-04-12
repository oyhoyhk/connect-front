import React, { useEffect, useState } from 'react';
import FriendsList from '../../components/Friends/FriendsList';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { requestFriendsList } from '../../modules/friends';

const FriendsListContainer = () => {
  const dispatch = useDispatch();
  const { friendsList } = useSelector(({ friends: { friendsList } }) => ({
    friendsList,
  }));
  const [pagination, setPagination] = useState(0);
  const MAX_PAGINATION = friendsList ? Math.ceil(friendsList.length / 10) : 0;
  const scrollHandler = debounce((e) => {
    if (e.deltaY === 100 && pagination + 1 < MAX_PAGINATION) {
      setPagination(pagination + 1);
    } else if (e.deltaY === -100 && pagination > 0) {
      setPagination(pagination - 1);
    }
  }, 300);
  useEffect(() => {
    const { uid } = JSON.parse(localStorage.user);
    dispatch(requestFriendsList({ uid }));
  }, [dispatch]);
  useEffect(() => {
    window.addEventListener('wheel', scrollHandler);
    return () => {
      window.removeEventListener('wheel', scrollHandler);
    };
  }, [pagination, scrollHandler]);

  return (
    <FriendsList
      friendsList={friendsList.slice(pagination * 10, (pagination + 1) * 10)}
      pagination={pagination}
      total={MAX_PAGINATION}
    />
  );
};

export default FriendsListContainer;
