import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import BookList from './components/BookList';
import AddBook from './components/AddBook';


//Apollo Client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Book List App</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;