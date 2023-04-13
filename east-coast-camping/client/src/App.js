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
import Profile from './pages/Profile';
import SignupForm from './pages/SignupForm';
import SearchResult from './pages/SearchResult'
import IndividualCampGround from './pages/IndividualPage';





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
            <Route

              path="/register"
              element={<SignupForm />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="/myBookings"
              element={<MyBookings />}
            />
            <Route
              path="/search"
              element={<SearchResult />}
            />
            <Route
              path="/campground"
              element={<IndividualCampGround />}
            />
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