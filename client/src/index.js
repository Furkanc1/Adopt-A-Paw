import './index.css';
import App from './App';
// import React from 'react';
// import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
// import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const container = document.getElementById('root');
const root = createRoot(container);

const clientURL = window && window.location.host.includes(`local`) ? `http://localhost:3001` : `https://adoptapaw-1-2c5b986974f2.herokuapp.com`;

const client = new ApolloClient({
  uri: `${clientURL}/graphql`, // Adjust the URI based on your server setup
  cache: new InMemoryCache(),
});

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
