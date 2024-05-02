import React from 'react'
import RegisterAccount from './components/RegisterAcc'
import Login from './components/Login'
import { Routes, Route, Navigate } from "react-router-dom";
import styles from './AuthApp.module.css';
import AdminSignup from './components/AdminSignup';
import AdminSignin from './components/AdminSignin';
import MainAdmin from 'apps/internal-app/pages/MainAdmin';
import AddRestaurant from '../internal-app/pages/AddRestaurant'

const AuthApp = () => {
  return (
    <>
      <Routes>
        <Route path='*' element={<div className={styles.AuthApp}><Navigate replace to='/signin' /></div>} />
        <Route path='/signin' element={
          <div className={styles.AuthApp}>
            <Login />
          </div>
        } />
        <Route path='/signup' element={
          <div className={styles.AuthApp}>
            <RegisterAccount />
          </div>
        } />
        <Route path='/adminsignup' element={
          <div className={styles.AuthApp}>
            <AdminSignup />
          </div>
        } />
        <Route path='/adminsignin' element={
          <div className={styles.AuthApp}>
            <AdminSignin />
          </div>
        } />
        <Route path='/admin' element={<MainAdmin />} />
        <Route path='/addrestaurant' element={<AddRestaurant />} />
      </Routes>
    </>
  )
}

export default AuthApp