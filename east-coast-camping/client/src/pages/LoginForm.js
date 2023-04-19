// see SignupForm.js for comments
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert, Container, Card, Row, Col, Image } from 'react-bootstrap';
import { USER_LOGIN } from '../utils/mutations';
import '../styles/login-signUp.css'
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import { useMutation } from "@apollo/react-hooks";
import { setShouldReload } from './Profile'

const LoginForm = () => {
    const navigate = useNavigate();
    const storedUrl = sessionStorage.getItem('currentUrl');

    const [userFormData, setUserFormData] = useState({ email: '', password: '' });// eslint-disable-next-line
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
            // event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await login({
                variables: { ...userFormData },
            });
            const data1 = Object.values(data)
            Auth.login(data1[0]._id);
            // if(Auth.loggedIn() && storedUrl){
            //     console.log('You have succeeded.')
            //     sessionStorage.removeItem('currentUrl');
            //     navigate('/', {reload: true});
            // }

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
            <div style={{ backgroundColor: 'rgb(108, 103, 103)', height: '100vh' }}>

                <Container className=' login-page' >
                    <Card>
                        <Row className='g-0 mr-3'>
                            <Col md='6'>
                                <Image src='https://user-images.githubusercontent.com/112873819/232332432-4e2e0ad9-7647-4166-aefc-720457ab531f.jpg' alt="login form" className='w-100 h-100 rounded' />
                            </Col>
                            <Col md='6'>
                                <Card.Body className='d-flex flex-column'>



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
                                            <h5 className=" my-4 pb-3 text-center" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
                                            <Form.Group className='input-field pb-4'>
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

                                            <Form.Group className='input-field  pb-4'>
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
                                            <div className='pt-2 text-center'>
                                                <Button className='mb-5 px-5' type='submit' >
                                                    Log In
                                                </Button>
                                            </div>
                                            <p className="mb-5 pb-lg-2 text-center" style={{ color: '#393f81' }}>Don't have an account? <a href="/register" style={{ color: '#393f81' }}>Register here</a></p>
                                        </Form>

                                    )}
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </div>

        </>
    );
};

export default LoginForm;
