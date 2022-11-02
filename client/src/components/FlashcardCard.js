import React, { useState } from "react";

function FlashcardCard({ flashcard, handleUpdatedFlashcard, handleDeletedFlashcard }) {
  const [editMode, setEditMode] = useState(false)
  const [updatedFlashcard, setUpdatedFlashcard] = useState(flashcard)
  const { id, question, answer } = updatedFlashcard

  function switchToEditMode() {
    setEditMode(true)
  }

  function handleChange(e) {
    setUpdatedFlashcard({...updatedFlashcard,
      [e.target.name]: e.target.value,
    })
  }
  
  function handleCancel() {
    setUpdatedFlashcard(flashcard)
    setEditMode(false)
  }

  function handleDelete() {
    handleDeletedFlashcard(id)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setEditMode(false)
    handleUpdatedFlashcard(id, updatedFlashcard)
  }

  return (
    editMode ? (
      <form className="flex-column-space-between card flashcard" onSubmit={handleSubmit}>
        <div className="flex-row-space-between">
          <button type='submit'>Save</button>
          <button className='cancel-button' type='button' onClick={handleCancel}>Cancel</button>
        </div>
        <label>Term:</label>
        <textarea rows="3" name='question' value={question} onChange={handleChange} />
        <label>Definition:</label>
        <textarea rows="3" name='answer' value={answer} onChange={handleChange} />
      </form>
    ) : (
      <div className="flex-column-space-between card flashcard">
        <i className="far fa-edit" onClick={switchToEditMode}/>
        <label>Term:</label>
        <p>{question}</p>
        <label>Definition:</label>
        <p>{answer}</p>
        <button className='delete-button' onClick={handleDelete}>Remove Flashcard</button>
      </div>
    )
  )
}

export default FlashcardCard;