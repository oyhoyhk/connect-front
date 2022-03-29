import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from '../../../node_modules/react-router/index';
import RegisterForm from '../../components/auth/RegisterForm';
import {
  changeField,
  initializeForm,
  initializeTempInfo,
  duplicateCheck,
} from '../../modules/auth';

const RegisterContainer = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, isDuplicate } = useSelector(({ auth, isDuplicate }) => ({
    form: auth.register,
    isDuplicate: auth.isDuplicate,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    if ([username, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요');
      return;
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      changeField({ form: 'register', key: 'password', value: '' });
      changeField({ form: 'register', key: 'passwordConfirm', value: '' });
      return;
    }
    dispatch(duplicateCheck({ username }));
  };
  useEffect(() => {
    if (isDuplicate === null) return;
    if (isDuplicate) {
      setError('이미 존재하는 아이디입니다.');
    } else {
      const { username, password } = form;
      navigate('/profile');
      dispatch(
        initializeTempInfo({
          username,
          password,
        }),
      );
    }
  }, [isDuplicate, dispatch, form, navigate]);
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {});
  return (
    <RegisterForm
      error={error}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterContainer;
