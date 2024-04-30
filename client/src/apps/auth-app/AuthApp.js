import React from 'react'
import RegisterAccount from './components/RegisterAcc'
import Login from './components/Login'
import { Routes, Route, Navigate } from "react-router-dom";
import styles from './AuthApp.module.css';
import AdminSignup from './components/AdminSignup';
import AdminSignin from './components/AdminSignin';
import MainAdmin from 'apps/internal-app/pages/MainAdmin';

const AuthApp = () => {
  return (
    <div className={styles.AuthApp}>
      <Routes>
        <Route path='*' element={<Navigate replace to='/signin' />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<RegisterAccount />} />
        <Route path='/adminsignup' element={<AdminSignup />} />
        <Route path='/adminsignin' element={<AdminSignin />} />
        <Route path='/admin' element={<MainAdmin />} />
      </Routes>
    </div>
  )
}

export default AuthApp