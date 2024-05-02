import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function RestaurantForm() {
    const navigate = useNavigate()
    const [form, setform] = useState({
        name: '',
        img: '',
        location: '',
        operation: {
            monday: { start_time: '09:00', close_time: '00:00' },
            tuesday: { start_time: '09:00', close_time: '00:00' },
            wednesday: { start_time: '09:00', close_time: '00:00' },
            thursday: { start_time: '09:00', close_time: '00:00' },
            friday: { start_time: '09:00', close_time: '00:00' },
            saturday: { start_time: '09:00', close_time: '00:00' },
            sunday: { start_time: '09:00', close_time: '00:00' }
        },
        tables: {}
    });
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        if (name.startsWith('operation')) {
            const [operation, day, time] = name.split('.');
            setform(prevForm => ({
                ...prevForm,
                operation: {
                    ...prevForm.operation,
                    [day]: {
                        ...prevForm.operation[day],
                        [time]: value
                    }
                }
            }));
        } else {
            setform(prevForm => ({
                ...prevForm,
                [name]: value
            }));
        }
    };
    const onSubmitHandler = async (event) => {
        event.preventDefault()
        const updatedForm = { ...form };

        // Clear the tables object
        updatedForm.tables = {};

        axios.post("restaurant/createrestaurant", form)
            .then((response) => {
                setform(prevForm => ({
                    ...prevForm,
                    tables: {}
                }));
                console.log(response)
                toast.success("Created Successfully")
            })
            .catch((err) => {
                console.log(err)
                toast.error("Something Went Wrong")
            })

    }

    const back = async () => {
        navigate('/admin')
    }

    return (
        <>
            <Toaster position="bottom-right" />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vh' }}>
                <Card style={{ width: '100%', padding: '20px', transform: 'none', margin: 'auto', left: '55vh' }}>
                    <div>
                        <h1 style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>Create New Restaurant</h1>
                        <div style={{ marginBottom: '2rem' }}>
                            <Row>
                                <Col>
                                    <h6>Restaurant Name</h6>
                                    <Form.Control type='text' name='name' onChange={onChangeHandler} /><br />
                                    <h6>Image</h6>
                                    <Form.Control type='text' name='img' onChange={onChangeHandler} /><br />
                                    <h6>Location</h6>
                                    <Form.Control type='text' name='location' onChange={onChangeHandler} /><br />
                                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                                        <React.Fragment key={day}>
                                            <h6>{day.charAt(0).toUpperCase() + day.slice(1)}</h6>
                                            <h6>From</h6>
                                            <Form.Control type='text' name={`operation.${day}.start_time`} value={form.operation[day].start_time} onChange={onChangeHandler} />
                                            <h6>To</h6>
                                            <Form.Control type='text' name={`operation.${day}.close_time`} value={form.operation[day].close_time} onChange={onChangeHandler} /><br />
                                        </React.Fragment>
                                    ))}
                                    <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '28rem' }}>
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
    );
}
export default RestaurantForm;
