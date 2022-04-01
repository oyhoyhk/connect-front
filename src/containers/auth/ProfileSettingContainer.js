import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileSettingForm from '../../components/auth/ProfileSettingForm';
import { initializeForm, register } from '../../modules/auth';
import imageCompression from '../../../node_modules/browser-image-compression/dist/browser-image-compression';
import { useNavigate } from '../../../node_modules/react-router/index';
import { check } from '../../modules/user';

const ProfileSettingContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [nickname, setNickname] = useState('');
  const { username, password, auth, user } = useSelector(
    ({ auth: { tempInfo, auth }, user }) => ({
      username: tempInfo.username,
      password: tempInfo.password,
      auth,
      user: user.user,
    }),
  );

  const onChange = (e, ref) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event) => {
        ref.style.backgroundImage = `url(${event.target.result})`;
        // setProfileImage(event.target.result.toString());
      };
      imageCompression(e.target.files[0]).then((res) => setProfileImage(res));
    } else {
      setNickname(e.target.value);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('nickname', nickname);
    formData.append('profileImage', profileImage);
    dispatch(register(formData));
  };
  useEffect(() => {
    if (username === '') {
      navigate(-1);
    }
    dispatch(initializeForm({ username, password }));
  }, [dispatch, password, username, navigate]);

  useEffect(() => {
    if (auth) {
      console.log('회원 가입 성공, auth : ', auth);
      dispatch(check());
    }
  }, [dispatch, auth]);

  useEffect(() => {
    if (user) {
      dispatch(initializeForm('register'));
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/friends');
    }
  }, [navigate, user, dispatch]);
  return (
    <ProfileSettingForm
      onChange={onChange}
      username={username}
      onSubmit={onSubmit}
    />
  );
};

export default ProfileSettingContainer;
