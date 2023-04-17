import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Card, Row, Col, Image } from 'react-bootstrap';
import { CREATE_USER } from '../utils/mutations';

import '../styles/login-signUp.css'

import { useMutation } from '@apollo/client';

function SignupForm() {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [createUser, { error, data }] = useMutation(CREATE_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        await createUser({
            variables: {
                email: formState.email,
                password: formState.password,
                firstName: formState.firstName,
                lastName: formState.lastName,
            },
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <>
            <div style={{ backgroundColor: '#D8D8D8', height: '100vh' }}>
                <Container className='login-page'>
                    <Card>
                        <Row className='g-0'>
                            <Col md='6'>
                                <Image src='https://user-images.githubusercontent.com/112873819/232332432-4e2e0ad9-7647-4166-aefc-720457ab531f.jpg' alt="signup form" className='w-100 h-100 rounded' />
                            </Col>
                            <Col md='6'>
                                <Card.Body className='d-flex flex-column'>

                                    <Form className='login-form' onSubmit={handleFormSubmit}>
                                        {data ? (
                                            <p>
                                                Success! You may now head{' '}
                                                <Link to="/">back to the homepage.</Link>
                                            </p>
                                        ) : (
                                            <>
                                                <div className='d-flex flex-row logo'>
                                                    <img
                                                        src="https://user-images.githubusercontent.com/112873819/230617279-ee879b3f-5e22-437f-a992-66d5df081bf5.png"
                                                        width="30"
                                                        height="30"
                                                        className="d-inline-block align-top"
                                                        alt="logo"
                                                    />
                                                    <h3 className="mb-0 text-dark pl-5">𝐄𝐚𝐬𝐭𝐂𝐨𝐚𝐬𝐭𝐂𝐚𝐦𝐩𝐢𝐧𝐠</h3>
                                                </div>
                                                <h5 className=" text-center" style={{ letterSpacing: '1px' }}>Register Now</h5>
                                                <div className='input-field '>
                                                    <label htmlFor="firstName">FirstName:</label>
                                                    <input className='inputs'
                                                        placeholder="First Name"
                                                        name="firstName"
                                                        type="firstName"
                                                        id="firstName"
                                                        onChange={handleChange} />
                                                </div>
                                                <div className='input-field'>
                                                    <label htmlFor="lastName">Last Name:</label>
                                                    <input className='inputs'
                                                        placeholder="Last Name"
                                                        name="lastName"
                                                        type="lastName"
                                                        id="lastName"
                                                        onChange={handleChange} />
                                                </div>
                                                <div className='input-field'>
                                                    <label htmlFor="email">Email:</label>
                                                    <input className='inputs'
                                                        placeholder="youremail@test.com"
                                                        name="email"
                                                        type="email"
                                                        id="email"
                                                        onChange={handleChange} />
                                                </div>
                                                <div className='input-field'>
                                                    <label htmlFor="pwd">Password:</label>
                                                    <input className='inputs'
                                                        placeholder="******"
                                                        name="password"
                                                        type="password"
                                                        id="pwd"
                                                        onChange={handleChange} />
                                                </div>
                                                <div className='pt-2 text-center'>
                                                    <Button className='mb-4 px-5' type="submit">Submit</Button>
                                                </div>
                                                <p className="mb-2 text-center" style={{ color: '#393f81' }}>Have an account? <a href="/Login" style={{ color: '#393f81' }}>Login here</a></p>
                                            </>
                                        )}

                                        {error && (
                                            <div className="my-3 p-3 bg-danger text-white">
                                                {error.message}
                                            </div>
                                        )}
                                    </Form>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </div>


        </>
    );
};


export default SignupForm;