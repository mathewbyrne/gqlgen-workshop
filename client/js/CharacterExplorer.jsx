import React, { useState } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import CharacterList from './CharacterList'
import CharacterModal from './CharacterModal'

const CharacterExplorer = () => {
  const [page, setPage] = useState(1)
  const [character, setCharacter] = useState(null)
  return (
    <div className="character-explorer">
      <h1>Rick &amp; Morty Exporer</h1>
      <div className="character-explorer__controls">
        <PaginationControls page={page} setPage={setPage} />
        <Query
          query={gql`
            query GetCharacters($page: Int!) {
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
              <div>
                <CharacterList
                  characters={data.characters}
                  onClick={character => setCharacter(character.id)}
                />
                {character && <CharacterModal id={character} onClose={() => setCharacter(null)} />}
              </div>
            )
          }}
        </Query>
      </div>
    </div>
  )
}

const PaginationControls = ({ page, setPage }) => (
  <div className="pagination">
    <div className="pagination__prev">
      {page > 1 && <button onClick={() => setPage(page - 1)}>Prev</button>}
    </div>

    <div className="pagination__page">Page {page}</div>

    <div className="pagination__next">
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  </div>
)

export default CharacterExplorer
