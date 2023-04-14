import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useQuery } from '@apollo/client';
import { QUERY_CAMPBYID, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

import "../styles/Upcoming.css";
import Upcoming from '../components/Upcoming';
import Completed from '../components/Completed';
import Footer from '../components/Footer';

function MyBookings() {
  const data = {
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
        <Navbar.Brand><h2>My Bookings</h2></Navbar.Brand>
        <Tabs
          defaultActiveKey="upcoming"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="upcoming" title="Upcoming" >
            <Upcoming />
          </Tab>
          <Tab eventKey="completed" title="Completed" >
            <Completed />
          </Tab>
          <Tab eventKey="Savedcamps" title="Saved Camps">
            Saved Camps Info
          </Tab>
        </Tabs>
      </div>
      <Footer />
    </>
  );
}

export default MyBookings;