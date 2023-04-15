import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useLazyQuery, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import "../styles/Upcoming.css";
import Upcoming from '../components/Upcoming';
import Completed from '../components/Completed';
import Footer from '../components/Footer';
import Favorite from '../components/Favorite';

function MyBookings() {
  // let id;
  // if (Auth.loggedIn()) {
  //   id = Auth.getToken()
  // };
  //  useQuery(QUERY_ME)
  //   , {variables: { userId: id }
  // });
  // const profile = data?.userById || {};
  // const data1 = (profile.saved)
  // localStorage.setItem("saved",data1)

  
  return (
    <>
      <div className="container my-1" style={{ minHeight: '100vh' }}>
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
          <Tab eventKey="favorite" title="Favorited Camps">
            <Favorite />
          </Tab>
        </Tabs>
      </div>
      <Footer />
    </>
  );
}

export default MyBookings;