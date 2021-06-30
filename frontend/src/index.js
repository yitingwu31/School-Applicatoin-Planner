import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
<<<<<<< HEAD
  HttpLink,
} from "@apollo/client";

=======
  HttpLink
} from "@apollo/client";
>>>>>>> 6085e80842fd84ca66198037d839414a83402e27
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';


<<<<<<< HEAD
const client = new ApolloClient({
  uri: 'https://localhost:5000',
  cache: new InMemoryCache()
});

=======
>>>>>>> 6085e80842fd84ca66198037d839414a83402e27
const httpLink = new HttpLink({
  uri: 'http://localhost:5000/',
});

// // Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/`,
  options: { reconnect: true },
});

// // using the ability to split links, you can send data to each link
// // depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
