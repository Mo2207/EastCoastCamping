// importing necessary dependencies
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
// importing style for contact page
import Footer from '../components/Footer';


export default function Contact() {
    // create a reference using useRef hook
    const form = useRef();
    // to get input data from contact form using useState
    const [values, setValues] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const validateForm = () => {
        let errors = {};
        if (!values.name) {
            errors.name = 'Name is required';
        }
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email is invalid';
        }
        if (!values.message) {
            errors.message = 'Message is required';
        }
        setErrors(errors);
        // check error is zero, if zero, return true 
        return Object.keys(errors).length === 0;
    };

    // used emailjs template to receive the message directly to my email
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            emailjs
                .sendForm(
                    'service_zezn407',
                    'template_qo7g4m8',
                    form.current,
                    't-dfFqeX4KEVQG46U'
                )
                .then(
                    (result) => {
                        console.log(result.text);
                    },
                    (error) => {
                        console.log(error.text);
                    }
                );
        }
    };

    return (
        <>
            <div className="container my-1">
                {/* <Link to="/">← Go to Home</Link> */}
                <div className="contact-bg vh-100 text-white">
                    <form
                        ref={form}
                        onSubmit={handleSubmit}
                        className="mx-auto col-10 col-md-8 col-lg-6 form-container"
                    >
                        <h1 className='text-black mt-5'>Contact Us</h1>
                        <div className="form-group mt-4">
                            <label className='text-black'>Name</label>
                            <input
                                type="text"
                                name="name"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                value={values.name}
                                onChange={handleChange}
                            />
                            {/* to display the error msg if there is no input */}
                            {/* invalid-feedback is from bootstrap and used to show err msg */}
                            {errors.name && (
                                <div className="invalid-feedback">{errors.name}</div>
                            )}
                        </div>

                        <div className="form-group mt-4">
                            <label className='text-black'>Email</label>
                            <input
                                type="email"
                                name="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                value={values.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <div className="invalid-feedback">{errors.email}</div>
                            )}
                        </div>

                        <div className="form-group mt-4">
                            <label className='text-black'>Message</label>
                            <textarea
                                name="message"
                                className={`form-control textbox-height ${errors.message ? 'is-invalid' : ''
                                    }`}
                                value={values.message}
                                onChange={handleChange}
                            />
                            {errors.message && (
                                <div className="invalid-feedback">{errors.message}</div>
                            )}
                        </div>
                        <input type="submit" value="Send" className="btn mt-4" style={{ backgroundColor: '#ADFB2F' }} />
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
