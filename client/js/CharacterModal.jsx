import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const CharacterModal = ({ id, onClose }) => (
  <div className="character-modal">
    <div className="character-modal__container">
      <Query
        query={gql`
          query Character($id: ID!) {
            character(id: $id) {
              name
              species
              status
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
          return <CharacterDisplay character={character} onClose={onClose} />
        }}
      </Query>
    </div>
  </div>
)

const CharacterDisplay = ({ character, onClose }) => (
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
        <dt>Status</dt>
        <dd>{character.status}</dd>
      </dl>
      {/* TODO Button */}
    </div>
  </div>
)

export default CharacterModal
