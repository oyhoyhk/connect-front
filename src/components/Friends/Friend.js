import React, { useState } from 'react';
import styled from 'styled-components';
import { css } from '../../../node_modules/styled-components/dist/styled-components.cjs';
import OptionBox from './OptionBox.js';

const FriendBlock = styled.div`
  margin: 0 auto;
  width: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  border-radius: 10px;
  padding: 4px;
  transition: 0.3s;
  &:hover {
    background: #73b2ff;
  }
  position: relative;
`;
const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid black;
  border-radius: 10px;
  background-size: 100% 100%;
  ${({ profileImage }) =>
    profileImage
      ? `background-image : url(${profileImage});`
      : `background-image : url('/img/default_profile.jpg');`}
`;

const Nickname = styled.div`
  width: 80px;
  height: 40px;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  overflow: hidden;
  padding: 0 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const HoverArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  border-radius: 10px;
  padding: 4px;
  transition: 0.3s;
`;
const TagsContainer = styled.div`
  position: absolute;
  width: 170px;
  z-index: 1;
  border: 2px solid #ff6e87;
  border-radius: 12px;
  left: 110%;
  color: white;
  ${({ optionBox }) =>
    optionBox
      ? css`
          display: none;
        `
      : css`
          display: flex;
        `}
  flex-wrap: wrap;
  transition: 0.3s;
  opacity: 0;
  animation-duration: 0.7s;
  animation-name: tags;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;

  ${({ type }) =>
    type === 'recommend'
      ? css`
          left: 110%;
        `
      : css`
          left: -95%;
        `}

  @keyframes tags {
    from {
      transform: translateY(-2px);
    }
    to {
      transform: translateY(1px);
    }
  }

  ${HoverArea}:hover ~ & {
    opacity: 1;
  }
`;
const Tag = styled.div`
  background: pink;
  margin: 5px;
  border-radius: 5px;
  padding: 0 5px;
`;
const OptionButton = styled.div`
  width: 25px;
  height: 40px;
  border: 2px solid black;
  border-radius: 10px;
  background: white;
  background-image: url('/img/optionButton.png');
  background-size: 80% 80%;
  background-repeat: no-repeat;
  background-position: center center;
  cursor: pointer;
`;

const Friend = ({ pid, friendRequest, profileImage, nickname, tags, type }) => {
  const [optionBox, setOptionBox] = useState(false);
  const clickOptions = () => {
    setOptionBox(!optionBox);
  };
  return (
    <FriendBlock>
      <HoverArea>
        <ProfileImage profileImage={profileImage} />
        <Nickname>{nickname}</Nickname>
        <OptionButton onClick={clickOptions} />
      </HoverArea>
      {optionBox ? (
        <OptionBox pid={pid} friendRequest={friendRequest} type={type} />
      ) : (
        ''
      )}

      {tags ? (
        <TagsContainer optionBox={optionBox} type={type}>
          {tags.split('_').map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsContainer>
      ) : (
        ''
      )}
    </FriendBlock>
  );
};

export default Friend;
