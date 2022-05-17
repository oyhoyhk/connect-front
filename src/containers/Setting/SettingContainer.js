import React, { useCallback, useEffect, useState } from 'react';
import Setting from '../../components/Setting/Setting';
import imageCompression from '../../../node_modules/browser-image-compression/dist/browser-image-compression';
import { useDispatch, useSelector } from 'react-redux';
import { modifyInfo } from '../../modules/user';
import client from '../../lib/api/client';

const SettingContainer = () => {
  const [blockList, setBlockList] = useState(null);

  const [profileImage, setProfileImage] = useState(null);
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const [errMsg, setErrMsg] = useState('');
  const dispatch = useDispatch();
  const onChange = (e, ref) => {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event) => {
        ref.style.backgroundImage = `url(${event.target.result})`;
      };
      imageCompression(e.target.files[0]).then((res) => setProfileImage(res));
    }
  };

  useEffect(() => {
    const getList = async () => {
      const list = await client.get('/api/friends/block_list?uid=' + user.uid);
      setBlockList(list.data);
    };
    getList();
  }, [user]);

  const onSubmit = (e) => {
    e.preventDefault();
    const { nickname, pw, pwCheck } = e.target;

    if (!nickname.value && !pw.value && !pwCheck.value && !profileImage) {
      setErrMsg('수정할 정보를 입력해주세요');
      return;
    } else {
      if (pw.value && pw.value !== pwCheck.value) {
        setErrMsg('비밀번호가 일치하지 않습니다.');
        return;
      }
      const formData = new FormData();
      const { uid, profileImage: previousProfileImage } = JSON.parse(
        localStorage.user,
      );
      formData.append('idx', uid);
      formData.append('password', pw.value);
      formData.append('nickname', nickname.value);
      formData.append('profileImage', profileImage);
      formData.append('previousProfileImage', previousProfileImage);
      dispatch(modifyInfo(formData));
      nickname.value = '';
      pw.value = '';
      pwCheck.value = '';
    }
  };
  const cancelBlock = (other) => {
    const getList = async () => {
      const list = await client.delete(
        `/api/friends/block_list?uid=${user.uid}&other=${other}`,
      );
      setBlockList(list.data);
    };
    getList();
  };
  return (
    <Setting
      onChange={onChange}
      user={user}
      onSubmit={onSubmit}
      errMsg={errMsg}
      blockList={blockList}
      cancelBlock={cancelBlock}
    />
  );
};

export default SettingContainer;
