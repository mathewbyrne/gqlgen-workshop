import React from 'react'

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

export default CharacterList
