import React from 'react';
import styled from 'styled-components';
import NoticeContainer from '../../containers/common/NoticeContainer';

const NoticeListBlock = styled.div`
  position: absolute;
  z-index: 50;
  left: -150px;
  top: 150%;
  border: 3px solid black;
  border-radius: 10px;
  width: 300px;
  background: white;
  font-size: 1rem;
`;

const NoticeList = ({ messages, onAccept, onRefuse }) => {
  return (
    <NoticeListBlock>
      {messages.map(({ uid, profileImage, nickname }) => (
        <NoticeContainer
          sender={uid}
          profileImage={profileImage}
          nickname={nickname}
        />
      ))}
    </NoticeListBlock>
  );
};

export default NoticeList;
