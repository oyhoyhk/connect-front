import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const UserListBlock = styled.div`
  width: 30%;
  height: 100%;
  overflow-y: auto;
  padding-right: 10px;
  box-shadow: 3px 3px 3px gray;

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
const User = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  justify-content: flex-end;
`;
const UserProfile = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid #ff6e87;
  border-radius: 10px;
  margin-right: 5px;
  background-size: 100% 100%;
  ${(props) =>
    props.profileImage &&
    css`
      background-image: url(/${props.profileImage});
    `}
`;
const Nickname = styled.div`
  height: 40px;
  font-size: 1.15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  border-radius: 12px;
  border: 2px solid #ff6e87;
  color: white;
  background: pink;
`;
const UserList = ({ userList, changeScroll }) => {
  const scrollBox = useRef();
  useEffect(() => {
    changeScroll(scrollBox.current);
  }, [userList, scrollBox, changeScroll]);
  return (
    <UserListBlock ref={scrollBox}>
      {userList &&
        userList.map((user, idx) => (
          <User key={idx} profileImage={user.profileImage}>
            {user.profileImage ? (
              <UserProfile profileImage={user.profileImage} />
            ) : (
              ''
            )}
            <Nickname>{user.nickname}</Nickname>
          </User>
        ))}
    </UserListBlock>
  );
};

export default UserList;
