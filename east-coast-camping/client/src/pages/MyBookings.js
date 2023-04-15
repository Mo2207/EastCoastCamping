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

// async function QueryCamps(){
//   const savedData = Auth.loaded();
//   console.log(savedData)
//   const [ data1 ] = await useQuery(QUERY_CAMPBYID, {
//     variables: {ids: savedData }
//   })
// }

function MyBookings() {
  // QueryCamps();


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