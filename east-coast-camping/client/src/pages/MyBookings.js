import React, { createContext, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';



function MyBookings() {
  const data  ={
    user: [
      {
        id: 1,
        firstName: 'Sayid',
        lastName: 'Khan',
      },
      {
        id: 2,
        firstName: 'Sun-Hwa',
        lastName: 'John',
      },
    ],
  };

console.log(data)
  let user;

  if (data) {
    user = data.user;
    console.log(user[0].firstName)
  }

  return (
    <>
      <div className="container my-1">
        <Navbar.Brand>Bookings History for {user[1].firstName} {user[1].lastName}</Navbar.Brand>            
            <Navbar collapseOnSelect expand="lg" bg="white" className='text-dark'>                
                <Container fluid>                    
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/upcoming">Upcoming</Nav.Link>
                            <Nav.Link href="/completed">Completed</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >

      </div>
    </>
  );
}

export default MyBookings;
