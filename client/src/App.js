import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div id='main'>
        <h1>Bill Keeper</h1>
      </div>
    </ApolloProvider>
  );
};

export default App;
