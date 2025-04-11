import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBBtn
} from 'mdb-react-ui-kit';
import Auth from '../utils/auth';


export default function Footer() {
    return (
        <>
            <MDBFooter className='text-center text-white' style={{ backgroundColor: '#0a4275' }}>

                {!Auth.loggedIn() ? (
                    <MDBContainer className='p-4 pb-0'>
                        <section className=''>
                            <p className='d-flex justify-content-center align-items-center'>
                                <span className='me-3'>Register for free</span>
                                <MDBBtn href='register' type='button' outline color="light" rounded>
                                    Sign up!
                                </MDBBtn>
                            </p>
                        </section>
                    </MDBContainer>
                ) : null}
                <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2023 Copyright:
                    <a className='text-white' href='/'>
                        EastCoastCamping
                    </a>
                </div>
            </MDBFooter>
        </>
    );

}