import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import {  CREATE_USER, USER_LOGIN } from '../utils/mutations';

import '../styles/login-signUp.css'

// import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
function SignupForm() {
    const [formState, setFormState] = useState({ 
        firstName:'',
        lastName:'',
        email: '', 
        password: '' 
    });
    const [ createUser, { error, data } ] = useMutation(CREATE_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        const { data } = await createUser({
        variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
        },
        });
        // const token = mutationResponse.data.addUser.token;
        // Auth.login(token);
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
            <div className='bg-image'>
                <Container className='form'>

                    <Form className='login-form' onSubmit={handleFormSubmit}>
                        <div className='top'>
                            <span className='fs-5'>Have an account?<Link to="/login">
                                <img src='https://user-images.githubusercontent.com/112873819/230982834-830260c2-8729-4080-a610-2f3944172403.png'
                                    width="30"
                                    height="30"
                                    alt="logo"
                                ></img>Login</Link></span>
                            <header>Signup</header>
                        </div>
                        {data ? (
                            <p>
                                Success! You may now head{' '}
                                <Link to="/">back to the homepage.</Link>
                            </p>
                        ) : (
                            <>
                                <div className='input-field'>
                                    <label className='text-white' htmlFor="firstName">FirstName:</label>
                                    <input className='inputs'
                                        placeholder="First Name"
                                        name="firstName"
                                        type="firstName"
                                        id="firstName"
                                        onChange={handleChange} />
                                </div>
                                <div className='input-field'>
                                    <label className='text-white' htmlFor="lastName">Last Name:</label>
                                    <input className='inputs'
                                        placeholder="Last Name"
                                        name="lastName"
                                        type="lastName"
                                        id="lastName"
                                        onChange={handleChange} />
                                </div>
                                <div className='input-field'>
                                    <label className='text-white' htmlFor="email">Email:</label>
                                    <input className='inputs'
                                        placeholder="youremail@test.com"
                                        name="email"
                                        type="email"
                                        id="email"
                                        onChange={handleChange} />
                                </div>
                                <div className='input-field'>
                                    <label className='text-white' htmlFor="pwd">Password:</label>
                                    <input className='inputs'
                                        placeholder="******"
                                        name="password"
                                        type="password"
                                        id="pwd"
                                        onChange={handleChange} />
                                </div>
                                <div className='pb-5 mt-5'>
                                    <button className='submit' type="submit">Submit</button>
                                </div>
                            </>
                        )}

                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                            {error.message}
                            </div>
                        )}
                    </Form>

                </Container>
            </div>

        </>
    );
};


export default SignupForm;