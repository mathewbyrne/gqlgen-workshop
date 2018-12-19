import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('app'))
})

const client = new ApolloClient({
  uri: 'http://localhost:8080/query',
})

const App = () => (
  <ApolloProvider client={client}>
    <h1>Rick &amp; Morty Explorer</h1>
    <CharacterExplorer />
  </ApolloProvider>
)

const CharacterExplorer = () => {
  const [page, setPage] = useState(1)
  return (
    <Query
      query={gql`
        query Characters($page: Int!) {
          characters(page: $page) {
            id
            name
            image
          }
        }
      `}
      variables={{ page }}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error</p>

        return (
          <div className="character-explorer">
            <div className="character-explorer__controls">
              {page > 1 && <button onClick={() => setPage(page - 1)}>Prev</button>}
              Page {page}
              <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
            <CharacterList characters={data.characters} />
          </div>
        )
      }}
    </Query>
  )
}

const CharacterList = ({ characters }) => (
  <div className="character-list">
    {characters.map(character => (
      <div className="character-list__item" key={`character-${character.id}`}>
        <img src={character.image} alt={character.name} />
        <div className="character-list__name">{character.name}</div>
      </div>
    ))}
  </div>
)
