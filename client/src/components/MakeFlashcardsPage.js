import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import FlashcardsForm from "./FlashcardsForm";
import FlashcardsList from "./FlashcardsList";

function MakeFlashcardsPage({ collections }) {
  const [inputData, setInputData] = useState("");
  const [flashcardData, setFlashcardData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  function generateFlashcardData() {
    let splitFlashcardData = inputData.split('\n//')
    let count = 0

    setFlashcardData(splitFlashcardData.map(flashcard => {
      count = count + 1
      const splitFlashcard = flashcard.split('\nA:')
      return {
        id: count,
        question: `${splitFlashcard[0] !== undefined ? splitFlashcard[0].replace('Q:','').trim() : ""}`,
        answer: `${splitFlashcard[1] !== undefined ? splitFlashcard[1].trim() : ""}`
      }
    }))
    setShowPreview(true)
  }

  function handleFlashcardCreation() {
    setIsLoading(true)
    fetch(`/flashcards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collection_id: id,
        flashcards: flashcardData
      })
    }).then((res) => {
      setIsLoading(false)
      if (res.ok) {
        history.push(`/collection/${id}`)
      } else {
        res.json().then((err) => setErrors(err.errors))
      }
    })
  }
  
  if (!collections || !collections.find(collection => collection.id == id) || errors.length > 0) {
    return <h2 className="padding">Unauthorized</h2>
  }

  return (
    !showPreview ? (
      <FlashcardsForm
        inputData={inputData}
        setInputData={setInputData}
        generateFlashcardData={generateFlashcardData}
      />
    ) : (
      <div className="padding">
        {errors.map((err) => (
          <p className="error">{err}</p>
        ))}
        <h2 className="title">
          <i className="fas fa-arrow-left" onClick={() => setShowPreview(false)}/>
          &nbsp; &nbsp; &nbsp; Make sure everything looks good!
        </h2>
        <FlashcardsList
          collectionId={id}
          flashcardData={flashcardData}
          setFlashcardData={setFlashcardData}
          inDatabase={false}
          setErrors={setErrors}
        />
        <div className="fixed-position-bottom flex-column-center">
          <button disabled={isLoading} onClick={handleFlashcardCreation}>
            {isLoading ? "Creating..." : "Create Flashcards!"}
          </button>
        </div>
      </div>
    )
  )
}

export default MakeFlashcardsPage; 