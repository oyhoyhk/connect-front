import React from 'react';
import { Route, Routes } from '../node_modules/react-router-dom/index';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ProfileSettingPage from './pages/ProfileSettingPage';
import RegisterPage from './pages/RegisterPage';
import FriendsPage from './pages/FriendsPage';
const App = () => {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/login" />
      <Route element={<MainPage />} path="/" />
      <Route element={<RegisterPage />} path="/register" />
      <Route element={<ProfileSettingPage />} path="/profile" />
      <Route element={<FriendsPage />} path="/friends" />
    </Routes>
  );
};

export default App;
