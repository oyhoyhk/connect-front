import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from '../../../node_modules/react-router/index';
import LoginForm from '../../components/auth/LoginForm';
import { changeField, initializeForm, login } from '../../modules/auth';
import { check } from '../../modules/user';

const LoginContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const { form, authError, auth, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    authError: auth.authError,
    auth: auth.auth,
    user: user.user,
  }));
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };
  useEffect(() => {
    if (authError) {
      setErr(true);
      return;
    }
    if (auth) {
      dispatch(check());
    }
  }, [authError, auth, dispatch]);
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(initializeForm('login'));
      try {
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/friends');
      } catch (e) {
        console.error(e);
      }
    }
  }, [user, navigate, dispatch]);
  return (
    <LoginForm
      form={form}
      onChange={onChange}
      errorMsg={err}
      onSubmit={onSubmit}
    />
  );
};

export default LoginContainer;
