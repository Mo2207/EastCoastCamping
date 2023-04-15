import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useLazyQuery, useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_CAMPBYARRAY } from '../utils/queries';
import Auth from '../utils/auth';
import "../styles/Upcoming.css";
import Upcoming from '../components/Upcoming';
import Completed from '../components/Completed';
import Footer from '../components/Footer';
import Favorite from '../components/Favorite';

function MyBookings() {
  let id=["643aa6bbe8d851d4fbe54193"];
  // if (Auth.loggedIn()) {
  //   id = ((localStorage.getItem("saved")).split(","))
  // };
  
  // console.log(id[0]);
  const  [ querryCampData, { loading, data }]  = useLazyQuery(QUERY_CAMPBYARRAY)
  
  if (loading) return <p>Loading....</p>;
  
  console.log(data)

  
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
          <button eventKey="favorite" onClick={()=> querryCampData({ variables: {ids: id }})} title="Favorited Camps">
            <Favorite />
          </button>
        </Tabs>
      </div>
      <Footer />
    </>
  );
}

export default MyBookings;