import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';

import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
      </Router>
    </ApolloProvider>
  );
};

export default App;
