import React, { useRef } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Background from '../common/Background';

const ProfileForm = styled.form`
  width: 400px;
  height: 620px;
  border-radius: 20px;
  border: 3px solid black;
  background: white;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageBox = styled.div`
  width: 330px;
  height: 330px;
  border: 2px solid black;
  border-radius: 20px;
  margin-top: 35px;
  background: url('./img/default_profile.jpg');
  background-size: 100% 100%;
`;
const UploadLabel = styled.label`
  outline: none;
  border: 2px solid black;
  width: 330px;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 25px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NicknameContainer = styled.div`
  width: 330px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  font-size: 1.5rem;
`;
const NicknameInput = styled.input`
  outline: none;
  padding: 10px;
  font-size: 1.2rem;
  border: none;
  width: 180px;
  text-align: center;
`;
const ButtonContainer = styled.div`
  width: 330px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
`;
const Button = styled.button`
  width: 100%;
  height: 45px;
  outline: none;
  color: ${palette.blue[1]};
  border: 2px solid ${palette.blue[0]};
  background: white;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.05rem;
`;

const ProfileSettingForm = ({ onChange, username, onSubmit }) => {
  const imageRef = useRef();
  return (
    <>
      <Background>
        <h1>프로필 설정</h1>
        <ProfileForm encType="multipart/form-data">
          <ImageBox ref={imageRef} />
          <UploadLabel htmlFor="profile">프로필 선택</UploadLabel>
          <input
            onChange={(e) => {
              onChange(e, imageRef.current);
            }}
            id="profile"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
          />
          <NicknameContainer>
            <div style={{ width: '120px', flex: 1 }}>닉네임</div>
            <NicknameInput
              type="text"
              placeholder={username}
              onChange={onChange}
              maxLength="8"
            />
          </NicknameContainer>
          <ButtonContainer>
            <Button onClick={onSubmit}>회원가입</Button>
          </ButtonContainer>
        </ProfileForm>
      </Background>
    </>
  );
};

export default ProfileSettingForm;
