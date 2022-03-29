import React from 'react';
import styled from 'styled-components';

const ProfileImageBlock = styled.div`
  width: 100%;
  height: 45%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;
const ProfileImageTitle = styled.div`
  width: 40%;
  background: #73b2ff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px;
  border-radius: 10px;
`;
const ProfileImageBox = styled.div`
  width: 242px;
  height: 242px;
  border: 2px solid #73b2ff;
  border-radius: 10px;
  background-size: 100% 100%;
  ${({ profileImage }) =>
    profileImage
      ? `background-image : url(${profileImage});`
      : `background-image : url('/img/default_profile.jpg');`}
`;
const ProfileImage = () => {
  const { nickname, profileImage } = JSON.parse(localStorage.user);
  return (
    <ProfileImageBlock>
      <ProfileImageTitle>{nickname}</ProfileImageTitle>
      <ProfileImageBox profileImage={profileImage} />
    </ProfileImageBlock>
  );
};

export default ProfileImage;
