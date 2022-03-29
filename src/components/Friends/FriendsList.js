import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { css } from '../../../node_modules/styled-components/dist/styled-components.cjs';
import Friend from './Friend';

const FriendsListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 220px;
`;
const FriendsListTitle = styled.div`
  width: 50%;
  background: #73b2ff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px;
  border-radius: 10px;
`;
const FriendsListBlock = styled.div`
  min-width: 220px;
  height: 580px;
  border: 2px solid #73b2ff;
  border-radius: 10px;
  padding: 5px;
  position: relative;
  &::-webkit-scrollbar {
    width: 6px;
    height: 8px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    width: 6px;
    height: 8px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.4);
  }
`;
const CustomScroll = styled.div`
  width: 5px;
  height: 100%;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  right: 0%;
  ${({ total, pagination }) => {
    const height = 100 / total;
    return css`
      height: ${height}%;
      top: ${pagination * height}%;
    `;
  }}
  transition:.3s;
`;

const FriendsList = ({ friendsList, pagination, total }) => {
  return (
    <FriendsListContainer>
      <FriendsListTitle>친구 목록</FriendsListTitle>
      <FriendsListBlock>
        {friendsList.map(({ profileImage, nickname, tags }, idx) => (
          <Friend
            key={idx}
            profileImage={profileImage}
            nickname={nickname}
            tags={tags}
            type="friends"
          />
        ))}
        {total > 1 ? (
          <CustomScroll pagination={pagination} total={total} />
        ) : (
          ''
        )}
      </FriendsListBlock>
    </FriendsListContainer>
  );
};

export default FriendsList;
