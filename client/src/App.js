import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path='/' component={Login} />
        <Route exact path='/home' component={Home} />
      </Router>
    </ApolloProvider>
  );
}

export default App;
