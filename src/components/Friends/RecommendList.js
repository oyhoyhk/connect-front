import React from 'react';
import styled from 'styled-components';
import FriendContainer from '../../containers/Friends/FriendContainer';

const RecommendListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 220px;
`;
const RecommendListTitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RecommendListTitle = styled.div`
  width: 50%;
  background: #73b2ff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px;
  border-radius: 10px;
`;
const RefreshButton = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 10px;
  border: 2px solid #73b2ff;
  background-size: 80% 80%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('/img/refresh.png');
  margin-right: 10px;
  cursor: pointer;
`;
const RecommendListBlock = styled.div`
  width: 100%;
  height: 580px;
  border: 2px solid #73b2ff;
  border-radius: 10px;
  padding: 5px;
`;
const RecommendList = ({ friendRequest, onRefresh, recommendList }) => {
  return (
    <RecommendListContainer>
      <RecommendListTitleContainer>
        <RefreshButton onClick={onRefresh} />
        <RecommendListTitle>추천 목록</RecommendListTitle>
      </RecommendListTitleContainer>
      <RecommendListBlock>
        {recommendList.map((person) => {
          const receiver = {
            uid: person.uid,
            nickname: person.nickname,
            profileImage: person.profileImage,
          };
          return (
            <FriendContainer
              friendRequest={friendRequest}
              type="recommend"
              key={person.uid}
              receiver={receiver}
              nickname={person.nickname}
              profileImage={person.profileImage}
              tags={person.tags}
            />
          );
        })}
      </RecommendListBlock>
    </RecommendListContainer>
  );
};

export default RecommendList;
