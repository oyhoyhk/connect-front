import React from 'react';
import { Route, Routes } from '../node_modules/react-router-dom/index';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ProfileSettingPage from './pages/ProfileSettingPage';
import RegisterPage from './pages/RegisterPage';
import FriendsPage from './pages/FriendsPage';
import ChattingListPage from './pages/ChattingListPage';
import ChattingModalContainer from './containers/ChattingModal/ChattingModalContainer';
import { useSelector } from 'react-redux';

const App = () => {
  const { chat } = useSelector(({ chatting: { chat } }) => ({
    chat,
  }));
  return (
    <>
      {chat && <ChattingModalContainer chat={chat} />}
      <Routes>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<MainPage />} path="/" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<ProfileSettingPage />} path="/profile" />
        <Route element={<FriendsPage />} path="/friends" />
        <Route element={<ChattingListPage />} path="/chatting" />
      </Routes>
    </>
  );
};

export default App;
