import React from 'react'

const CharacterModal = ({ id, onClose }) => (
  <div className="character-modal">
    <div className="character-modal__container">{/* TODO GraphQL Query */}</div>
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
