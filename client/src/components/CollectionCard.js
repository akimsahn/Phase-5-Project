import React from "react";
import { useHistory } from "react-router-dom";

function CollectionCard({ collection }) {
  const { id, name, subject, short_description, count } = collection
  const history = useHistory();

  function handleCollectionClick() {
    history.push(`/collection/${id}`)
  }

  function routeToTestMode() {
    history.push(`/test_mode/${id}`)
  }
  
  return (
    <div className="card">
      <div className="full-height" onClick={handleCollectionClick}>
        <h2>{name}</h2>
        <h3>{subject}</h3>
        <p>{short_description === null || short_description.length < 100 ? (
          short_description) : ( short_description.slice(0, 99) + '...' )}
        </p>
      </div>
      <div className="card-bottom">
        <p>{count === 1 ? '1 Flashcard' : `${count} Flashcards`}</p>
        <div className="flex-column-center">
          <button disabled={count === 0} className="blue-button" onClick={routeToTestMode}>Start Studying!</button>
        </div>
      </div>
    </div>
  )
}

export default CollectionCard;