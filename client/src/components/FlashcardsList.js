import React from "react";
import FlashcardCard from "./FlashcardCard";

function FlashcardsList({ collectionId, flashcardData, setFlashcardData, inDatabase, setErrors }) {

  function handleUpdatedFlashcard(flashcardId, updatedFlashcard) {
    if (inDatabase) {
      fetch(`/flashcards/${flashcardId}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedFlashcard)
      }).then(res => {
        if (!res.ok) {
          res.json().then((err) => setErrors(err.errors))
        }
      })
    } else {
      setFlashcardData(flashcardData.map((flashcard) => flashcard.id === flashcardId ? updatedFlashcard : flashcard))
    }
  }

  function handleDeletedFlashcard(flashcardId) {
    if (inDatabase) {
      fetch(`/flashcards/${flashcardId}/${collectionId}`, {method: 'DELETE'})
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            setFlashcardData(data.id)
          })
        } else {
          res.json().then((err) => setErrors(err.errors))
        }
      })
    } else {
      setFlashcardData(flashcardData.filter((flashcard) => flashcard.id !== flashcardId))
    }
  }

  return (
    <div className="card-list">
      {flashcardData.map((flashcard) => (
        <FlashcardCard
          key={flashcard.id}
          flashcard={flashcard}
          handleUpdatedFlashcard={handleUpdatedFlashcard}
          handleDeletedFlashcard={handleDeletedFlashcard}
        />
      ))}
    </div>
  )
}

export default FlashcardsList;