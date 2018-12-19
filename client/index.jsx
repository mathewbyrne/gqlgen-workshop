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
  const [character, setCharacter] = useState(null)
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
        if (loading) return <div className="loading">Loading...</div>
        if (error) return <div className="error">Error</div>

        return (
          <div className="character-explorer">
            <div className="character-explorer__controls">
              {page > 1 && <button onClick={() => setPage(page - 1)}>Prev</button>}
              Page {page}
              <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
            <CharacterList
              characters={data.characters}
              onClick={character => setCharacter(character.id)}
            />
            {character && <CharacterModal id={character} onClose={() => setCharacter(null)} />}
          </div>
        )
      }}
    </Query>
  )
}

const CharacterList = ({ characters, onClick }) => (
  <div className="character-list">
    {characters.map(character => (
      <div
        className="character-list__item"
        key={`character-${character.id}`}
        onClick={() => onClick(character)}
      >
        <img src={character.image} alt={character.name} />
        <div className="character-list__name">{character.name}</div>
      </div>
    ))}
  </div>
)

const CharacterModal = ({ id, onClose }) => (
  <div className="character-modal">
    <div className="character-modal__container">
      <Query
        query={gql`
          query Character($id: Int!) {
            character(id: $id) {
              name
              species
              image
            }
          }
        `}
        variables={{ id }}
      >
        {({ loading, error, data }) => {
          if (loading) return <div className="loading">Loading...</div>
          if (error) return <div className="error">Error</div>
          const character = data.character
          return (
            <div>
              <button onClick={onClose} className="close-button">
                ×
              </button>
              <div className="character-modal__details">
                <img src={character.image} alt={character.name} />
                <dl>
                  <dt>Name</dt>
                  <dd>{character.name}</dd>
                  <dt>Species</dt>
                  <dd>{character.species}</dd>
                </dl>
              </div>
            </div>
          )
        }}
      </Query>
    </div>
  </div>
)
