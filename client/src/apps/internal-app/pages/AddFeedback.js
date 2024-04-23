import axios from 'axios';
import React, { useState } from 'react';
import { Card, Form, Col, Row, Button } from "react-bootstrap";
import { Toaster, toast } from 'react-hot-toast';

function AddFeedback() {
    const [form, setform] = useState({})
    const onChangeHandler = (event) => {
        const { name, value } = event.target
        setform({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()
        console.log(form)
        axios.post('feedback/addfeedback', form)
            .then((response) => {
                console.log("result", response)
                toast.success("Successfully Added")
            })
            .catch((err) => {
                console.log(err)
                toast.error("Something Went Wrong")
            })
    }
    const onRatingChangeHandler = (event) => {
        let rating = parseInt(event.target.value);
        if (rating > 5) {
            rating = 5;
        }
        setform({
            ...form,
            Rating: rating.toString()
        });
    };
    const validateRatingInput = (event) => {
        const regex = /^[0-5]*$/;
        if (!regex.test(event.key)) {
            event.preventDefault();
        }
    };

    return (
        <>
            <Toaster position="bottom-right" />
            <Card style={{ width: '800px', justifyContent: "center", marginLeft: '145px', padding: '20px', transform: 'none' }}>
                <div>
                    <h1 style={{ color: 'red', display: 'flex', marginLeft: '16rem', padding: 8, paddingTop: 20, paddingBottom: 10 }}>Add Feedback</h1>
                    <div style={{ marginBottom: '2rem' }}>
                        <Row>
                            <Col>
                                <h6>Name</h6>
                                <Form.Control type='text' name='Name' onChange={onChangeHandler} /><br />
                                <h6>Email</h6>
                                <Form.Control type='text' name='Email' onChange={onChangeHandler} /><br />
                                <h6>Rating</h6>
                                <Form.Control type='text' name='Rating' maxLength="1" onChange={onRatingChangeHandler} onKeyPress={validateRatingInput} /><br />
                                <h6>Restaurant Name</h6>
                                <Form.Control type='text' name='RestaurantName' onChange={onChangeHandler} /><br />
                                <h6>Comment</h6>
                                <Form.Control as='textarea' rows='3' name='Message' onChange={onChangeHandler} /><br />
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button type='submit' onClick={onSubmitHandler}>Submit</Button>
                                </div>

                            </Col>
                        </Row>
                    </div>
                </div>
            </Card >
        </>

    )
}

export default AddFeedback