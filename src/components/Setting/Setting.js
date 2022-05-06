import React, { useRef } from 'react';
import styled from 'styled-components';

const SettingBlock = styled.form`
  width: 800px;
  height: 600px;
  margin: 0 auto;
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

const Setting = ({
  onChange,
  user: { username, nickname, profileImage },
  onSubmit,
  errMsg,
}) => {
  const imageRef = useRef();
  return (
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
  );
};

export default Setting;
