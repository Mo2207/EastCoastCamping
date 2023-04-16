// see SignupForm.js for comments
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { USER_LOGIN } from '../utils/mutations';
import '../styles/login-signUp.css'

import Auth from '../utils/auth';
import { useMutation } from "@apollo/react-hooks";

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(USER_LOGIN)

    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false); 
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data }  = await login({
                variables: { ...userFormData },
            });
            const data1 = Object.values(data)
            console.log(data1[0]._id)
            Auth.login( data1[0]._id, data1[0].saved);

        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }

        setUserFormData({
            email: '',
            password: '',
        });

    };

    return (
        <>
            <div className='bg-image'>
                <Container className='form'>
                    {Auth.loggedIn() ? (
                        <p>
                            Success! You may now head{' '}
                            <Link to="/">back to the homepage.</Link>
                        </p>
                    ) : (
                    <Form className='login-form' noValidate validated={validated} onSubmit={handleFormSubmit}>
                        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                            Something went wrong with your login credentials!
                        </Alert>
                        <div className='top'>
                            <span>Have an account?</span>
                            <header>Login</header>
                        </div>
                        <Form.Group className='input-field'>
                            <Form.Control className='inputs'
                                type='text'
                                placeholder='Your email'
                                name='email'
                                onChange={handleInputChange}
                                value={userFormData.email}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='input-field'>
                            <Form.Control className='inputs'
                                type='password'
                                placeholder='Your password'
                                name='password'
                                onChange={handleInputChange}
                                value={userFormData.password}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                        </Form.Group>
                        <Button className='submit'
                            type='submit'
                            variant='success'>
                            Submit
                        </Button>
                    </Form>
                    )}

                </Container>
            </div>
        </>
    );
};

export default LoginForm;
