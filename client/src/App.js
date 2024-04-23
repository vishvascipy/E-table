import './css/App.css';
import InternalApp from './apps/internal-app/InternalApp';
import AuthApp from './apps/auth-app/AuthApp';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { updateAuth } from 'store/features/userSlice';
import { loggeduser } from './store/loggeduserSlice'
require('dotenv').config()

const App = () => {

  const user = useAppSelector((state) => state.user);
  const userid = useAppSelector((state) => state.logineduser)
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    axios.get('api/v1/user/auth', {
      headers: {
        'x-access-token': user.token
      }
    }).then((response) => {
      console.log("bye", response)
      if (response.data.auth && isMounted) {
        dispatch(updateAuth(true));
        dispatch(loggeduser(response.data.userid))
      };
    }).catch((err) => {
      dispatch(updateAuth(false));
    });

    return () => { isMounted = false };
  }, [dispatch, user.token]);

  return (
    <div className='App'>
      {user.auth ?
        <InternalApp />
        :
        <AuthApp />
      }
    </div>
  );
}

export default App;
