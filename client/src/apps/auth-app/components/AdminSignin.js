import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/Login.module.css'
import { useNavigate } from 'react-router-dom';

function AdminSignin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post("admin/signinadmin", {
            Email: email,
            Password: password
        })
            .then((response) => {
                console.log(response)
                setEmail('')
                setPassword('')
                setErrorMessage('')
                navigate("/admin")
            })
            .catch((err) => {
                if (err.response) {
                    setErrorMessage(err.response.data);
                }
                console.log(err)
            })
    }
    return (
        <>
            <div className={styles.Login}>
                <div className={styles.Form}>
                    <div className={styles.Username}>
                        <label>Email</label>
                        <input
                            name='username'
                            value={email}
                            placeholder='example@gmail.com'
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}>
                        </input>
                    </div>
                    <div className={styles.Password}>
                        <label>Password</label>
                        <input
                            name='password'
                            value={password}
                            placeholder='******'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}>
                        </input>
                    </div>
                    <div className={styles.Submit}>
                        <input
                            value='Log In'
                            type='submit'
                            onClick={onSubmitHandler}>
                        </input>
                    </div>
                    <div className={styles.SubMessage}>
                        <p>Don't have an account?
                            <Link id={styles.signup} to='/adminsignup'>Sign up.</Link>
                        </p>
                    </div>
                    <div className={styles.ErrorMessage}>
                        <p>{errorMessage}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSignin