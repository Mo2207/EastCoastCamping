import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

import { setContext } from '@apollo/client/link/context';

import MyBookings from './pages/MyBookings';
import Completed from './components/Completed';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';

import LoginForm from './pages/LoginForm';
import NoMatch from './pages/NoMatch';
import Regret from './components/Regret';
import Profile from './pages/Profile';
import SignupForm from './pages/SignupForm';
import SearchResult from './pages/SearchResult'
import IndividualCampGround from './pages/IndividualPage';
import Footer from './components/Footer';
import Favorite from './components/Favorite';
import Reservation from './components/Reservation'
import PaymentForm from './components/paymentForm';





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
              path="/me"
              element={<Profile />}
            />
            <Route
              path="/myBookings"
              element={<MyBookings />}
            />
            <Route
              path="/completed"
              element={<Completed />}
            />
            <Route
              path="/favorite"
              element={<Favorite />}
            />
            <Route
              path="/search"
              element={<SearchResult />}
            />
            <Route
              path="/campground/:id"
              element={<IndividualCampGround />}
            />
            <Route
              path="/regret"
              element={<Regret />}
            />
            <Route
              path="/reservation"
              element={<Reservation />}
            />

            <Route
              path="/checkout"
              element={<PaymentForm />}
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