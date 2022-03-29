import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from '../../../node_modules/axios/index';
import ProfileImage from '../../components/Friends/ProfileImage';
import FriendsListContainer from './FriendsListContainer';
import RecommendContainer from './RecommendContainer';
import TagContainer from './TagContainer';

const FriendsContainerBlock = styled.div`
  width: 800px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

const Middle = styled.div`
  width: 30%;
  height: 650px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const FriendsContainer = () => {
  return (
    <FriendsContainerBlock>
      <FriendsListContainer />
      <Middle>
        <ProfileImage />
        <TagContainer />
      </Middle>
      <RecommendContainer />
    </FriendsContainerBlock>
  );
};

export default FriendsContainer;
