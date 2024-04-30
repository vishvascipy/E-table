import React, { useState, useEffect } from 'react'
import styles from './InternalApp.module.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Settings from './containers/Settings';
import NavBar from './containers/NavBar';
import Home from './containers/Home';
import TablesPage from './pages/booking/TablesPage';
import BookingPage from './pages/booking/BookingPage';
import AdminPage from './pages/booking/admin';
import MenuPage from './pages/MenuPage';
import PostMenu from './pages/postMenu';
import AddFeedback from './pages/AddFeedback';
import Viewfeedback from './pages/Viewfeedback';
import ViewCart from './pages/ViewCart';
import MainAdmin from './pages/MainAdmin';

const InternalApp = () => {

  const [admin, setAdmin] = useState();



  useEffect(() => {
    const resName = JSON.parse(localStorage.getItem("admin"));
    console.log("adm", resName);
    if (resName == null) {
      setAdmin(false)
    }
    else {
      setAdmin(true)
    }
    console.log("submiting", admin);
  });


  function Dashboard() {
    return (
      <div className={styles.InternalApp}>
        <div className={styles.NavBar}>
          <NavBar />
        </div>
        <div className={styles.View}>
          <Routes>
            <Route path='*' element={<Navigate replace to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/booking'>
              <Route path='/booking' element={<BookingPage />} />
              <Route path='/booking/tables' element={<TablesPage />} />
            </Route>
            <Route path='/Menu' element={<MenuPage />} />
            <Route path='/addfeedback' element={<AddFeedback />} />
            <Route path='/viewcart' element={<ViewCart />} />
          </Routes>
        </div>
      </div>
    )
  }

  return (
    <div className='App'>
      {admin ?
        <Routes>
          <Route path='/home' element={<AdminPage />} />
          <Route path='/home/addMenu' element={<PostMenu />} />
          <Route path='/home/viewfeedback' element={<Viewfeedback />} />
          {/* <Route path='/admin' element={<MainAdmin />} /> */}

        </Routes>
        :
        <Dashboard />
      }
    </div>
  )
}

export default InternalApp;