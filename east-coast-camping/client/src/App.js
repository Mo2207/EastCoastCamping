import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import { setContext } from '@apollo/client/link/context';

import MyBookings from './pages/MyBookings';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';

import LoginForm from './pages/LoginForm';
import NoMatch from './pages/NoMatch';





const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>

            <Navbar />
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/contact" 
                element={<Contact />} 
              />              
              <Route 
                path="/login" 
                element={<LoginForm />} 
              />
              {/* <Route 

                path="/signup" 
                element={<Signup />} 
              /> */}
              {/* <Route 
                path="/success" 
                element={<Success />} 
              /> */}
              <Route 
                path="/myBookings" 
                element={<MyBookings />} 
              />
              {/* <Route 
                path="/products/:id" 
                element={<Detail />} 
              /> */}
              <Route 
                path="*" 
                element={<NoMatch />} 

              />
            </Routes>

        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;