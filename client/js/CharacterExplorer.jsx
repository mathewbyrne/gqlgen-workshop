import React, { useState } from 'react'

const CharacterExplorer = () => {
  const [page, setPage] = useState(1)
  return (
    <div className="character-explorer">
      <h1>Rick &amp; Morty Exporer</h1>
      <div className="character-explorer__controls">
        <PaginationControls page={page} setPage={setPage} />
        {/* TODO Query */}
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
