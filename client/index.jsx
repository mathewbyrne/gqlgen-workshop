import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('app'))
})

const client = new ApolloClient({
  uri: 'http://localhost:8080/query',
})

const App = () => (
  <ApolloProvider client={client}>
    <h1>Rick &amp; Morty Explorer</h1>
  </ApolloProvider>
)
