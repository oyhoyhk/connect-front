import React, { useRef } from 'react';
import styled from 'styled-components';

const SettingContainer = styled.div`
  width: 800px;
  height: 600px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

const SettingBlock = styled.form`
  width: 400px;
  height: 600px;
  color: #0780ff;
`;
const SettingSection = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 40px;
  font-size: 1.35rem;
`;
const SectionInfo = styled.div`
  font-weight: bold;
  width: 40%;
  text-align: right;
  margin-right: 40px;
`;
const UserInfo = styled.div``;
const InfoInput = styled.input`
  height: 29px;
  margin-bottom: 10px;
  outline: none;
`;
const PasswordInputContainer = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
`;
const ProfileImage = styled.label`
  display: inline-block;
  width: 200px;
  height: 200px;
  border: 2px solid #0780ff;
  border-radius: 20px;
  cursor: pointer;
  background-size: 100% 100%;
  ${({ profileImage }) =>
    profileImage
      ? `background-image : url(${profileImage});`
      : `background-image : url('/img/default_profile.jpg');`}
`;
const ErrorMessage = styled(SettingSection)`
  color: red;
  justify-content: center;
  font-size: 1.1rem;
  height: 25px;
`;
const Button = styled.button`
  display: block;
  margin: 0 auto;
  outline: none;
  border: 2px solid #0780ff;
  border-radius: 10px;
  padding: 10px 15px;
  background: none;
  font-size: 1.3rem;
  color: #0780ff;
  cursor: pointer;
  transition: 0.25s;
  &:hover {
    background: #0780ff;
    color: white;
  }
`;

const BlockListContainer = styled.div`
  width: 300px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const BlockListTitle = styled.div`
  color: white;
  border-radius: 12px;
  font-size: 1.15rem;
  background: #999999;
  padding: 10px 20px;
`;

const BlockList = styled.div`
  width: 100%;
  height: 90%;
  overflow-y: auto;
  overflow-x: hidden;
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

const BlockUserBlock = styled.div`
  width: 95%;
  margin: 5px auto;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BlockUserProfileImage = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid gray;
  border-radius: 10px;
  background-size: 100% 100%;
  ${({ profileImage }) =>
    profileImage
      ? `background-image : url(${profileImage});`
      : `background-image : url('/img/default_profile.jpg');`}
`;

const BlockUserNickname = styled.div`
  width: 50%;
  height: 40px;
  background: #f3f3f3;
  border: 2px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const BlockCancelButton = styled.button`
  outline: none;
  border: 2px solid #ff4646;
  border-radius: 10px;
  width: 60px;
  height: 40px;
  background: #ff7c7c;
  color: white;
  cursor: pointer;
`;

const BlockUser = ({ uid, profileImage, nickname, cancelBlock }) => {
  return (
    <BlockUserBlock>
      <BlockUserProfileImage profileImage={profileImage} />
      <BlockUserNickname>{nickname}</BlockUserNickname>
      <BlockCancelButton onClick={() => cancelBlock(uid)}>
        해 제
      </BlockCancelButton>
    </BlockUserBlock>
  );
};

const Setting = ({
  onChange,
  user: { username, nickname, profileImage },
  onSubmit,
  errMsg,
  blockList,
  cancelBlock,
}) => {
  const imageRef = useRef();
  return (
    <SettingContainer>
      <SettingBlock onSubmit={onSubmit} encType="multipart/form-data">
        <SettingSection>
          <SectionInfo>아이디</SectionInfo>
          <UserInfo>{username}</UserInfo>
        </SettingSection>
        <SettingSection>
          <SectionInfo>닉네임</SectionInfo>
          <InfoInput id="nickname" placeholder={nickname} maxLength="8" />
        </SettingSection>
        <SettingSection>
          <SectionInfo>비밀번호</SectionInfo>
          <PasswordInputContainer>
            <InfoInput
              id="pw"
              type="password"
              placeholder="새 비밀번호"
              maxLength="8"
            />
            <InfoInput
              id="pwCheck"
              type="password"
              placeholder="비밀번호 확인"
              maxLength="8"
            />
          </PasswordInputContainer>
        </SettingSection>
        <SettingSection>
          <SectionInfo>프로필 사진</SectionInfo>
          <div>
            <ProfileImage
              htmlFor="profile"
              ref={imageRef}
              profileImage={profileImage}
            />
            <input
              type="file"
              accept="image/*"
              id="profile"
              onChange={(e) => onChange(e, imageRef.current)}
              style={{ display: 'none' }}
            />
          </div>
        </SettingSection>
        <ErrorMessage>{errMsg}</ErrorMessage>
        <Button type="submit">수정하기</Button>
      </SettingBlock>
      <BlockListContainer>
        <BlockListTitle>차단 목록</BlockListTitle>
        <BlockList>
          {blockList &&
            blockList.map(({ uid, nickname, profileImage }) => (
              <BlockUser
                uid={uid}
                nickname={nickname}
                profileImage={profileImage}
                cancelBlock={cancelBlock}
              />
            ))}
        </BlockList>
      </BlockListContainer>
    </SettingContainer>
  );
};

export default Setting;
