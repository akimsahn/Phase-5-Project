import React from "react";
import { useHistory } from "react-router-dom";
import TestModeSelection from "./TestModeSelection";

function CollectionCard({ collection, setShowDefinitionFirst }) {
  const { id, name, subject, short_description, count } = collection
  const history = useHistory();

  function handleCollectionClick() {
    history.push(`/collection/${id}`)
  }

  function routeToTestMode() {
    history.push(`/test_mode/${id}`)
  }
  
  return (
    <div className="card flex-column-space-between">
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
          <TestModeSelection id={id} count={count} setShowDefinitionFirst={setShowDefinitionFirst} />
        </div>
      </div>
    </div>
  )
}

export default CollectionCard;