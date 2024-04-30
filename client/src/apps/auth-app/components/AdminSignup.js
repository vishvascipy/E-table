import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/RegisterAcc.module.css'
import { useNavigate } from 'react-router-dom';

function AdminSignup() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post("admin/signupadmin", {
            UserName: username,
            Email: email,
            Password: password
        })
            .then((response) => {
                console.log("adminsignup", response)
                setErrorMessage('')
                setUsername('')
                setEmail('')
                setPassword('')
                navigate("/adminsignin")
            })
            .catch((err) => {
                console.log("adminsignerr", err)
                let message = err;
                if (err.response) message = err.response.data
                setErrorMessage(message);
            })
    }

    return (
        <>
            <div className={styles.RegisterAcc}>
                <div className={styles.Form}>
                    <div className={styles.Username}>
                        <label>UserName</label>
                        <input
                            name='UserName'
                            value={username}
                            placeholder='User Name'
                            type='email'
                            onChange={(e) => setUsername(e.target.value)}>
                        </input>
                    </div>
                    <div className={styles.Password}>
                        <label>Email</label>
                        <input
                            name='password'
                            value={email}
                            placeholder='Email'
                            type='text'
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
                            value='Register Account'
                            type='submit'
                            onClick={onSubmitHandler}>
                        </input>
                    </div>
                    <div className={styles.SubMessage}>
                        <p>Already have an account?
                            <Link id={styles.signin} to='/adminsignin'>Sign In.</Link>
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

export default AdminSignup