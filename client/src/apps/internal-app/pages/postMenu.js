import axios from 'axios';
import React, { useState } from 'react';
import { Card, Form, Col, Row, Button } from "react-bootstrap";
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

function PostMenu() {
    const navigate = useNavigate()
    const [form, setform] = useState([])
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setform({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        console.log(form);
        const formData = {
            Name: form.Name,
            menu: [{
                img: form.img,
                Title: form.Title,
                Price: form.Price,
                Description: form.Description
            }]
        }

        axios.post('menuRoute/postmenu', formData) 
            .then((response) => {
                console.log("result", response)
                toast.success("Menu Created")
            })
            .catch((err) => {
                console.log(err)
                toast.error("Something Went Wrong")
            })

    }

    const back = async () => {
        navigate('/home')
    }

    return (
        <>
            <Toaster position="bottom-right" />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vh' }}>
                <Card style={{ width: '100%', padding: '20px', transform: 'none', margin: 'auto', left: '55vh' }}>
                    <div>
                        <h1 style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>Create New Menu</h1>
                        <div style={{ marginBottom: '2rem' }}>
                            <Row>
                                <Col>
                                    <h6>Restaurant Name</h6>
                                    <Form.Control type='text' name='Name' onChange={onChangeHandler} /><br />
                                    <h6>Image</h6>
                                    <Form.Control type='text' name='img' onChange={onChangeHandler} /><br />
                                    <h6>Title</h6>
                                    <Form.Control type='text' name='Title' onChange={onChangeHandler} /><br />
                                    <h6>Price</h6>
                                    <Form.Control type='text' name='Price' onChange={onChangeHandler} /><br />
                                    <h6>Description</h6>
                                    <Form.Control type='text' name='Description' onChange={onChangeHandler} /><br />
                                    <div style={{ display: 'flex', justifyContent: 'center', marginLeft:'28rem' }}>
                                        <Button type='submit' onClick={onSubmitHandler}>Submit</Button>
                                        <Button style={{ marginLeft: '15px' }} variant='secondary' onClick={back}>Back</Button>
                                    </div>

                                </Col>
                            </Row>
                        </div>
                    </div>
                </Card >
            </div>
        </>
    )
}

export default PostMenu