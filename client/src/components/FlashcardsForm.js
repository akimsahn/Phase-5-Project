import React from "react";

function FlashcardsForm({ inputData, setInputData, generateFlashcardData }) {
  const placeholder = "Q: <first flashcard term here>\nA: <first flashcard definition here>\n//\n" +
  "Q: <second flashcard term here>\nA: <second flashcard definition here>\n//\nQ: ..."

  function handleChange(e) {
    setInputData(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    generateFlashcardData()
  }

  return (
    <div className="padding">
      <h2 className="title">Create Your Own Flashcards</h2>
      <form onSubmit={handleSubmit}>
        <div className="flashcard-form">
          <div className="inline-block">
            <b>
              {"Enter the information you'd like to appear on your flashcards using the " +
              "following format:"}
            </b>
            <ul>
              {"Q: <first flashcard term here>"}<br/>
              {"A: <first flashcard definition here>"}<br/>
              {"//"}<br/>
              {"Q: <second flashcard term here>"}<br/>
              {"A: <second flashcard definition here>"}<br/>
              {"//..."}<br/>
            </ul>
            <b>Things to Note:</b>
            <ul>
              <li>
                {'Indicate separation of individual flashcards by using two consecutive ' +
                'forward slashes ("//") as a separator'}
              </li>
              <li>
                Start a line with "Q:" to specify the term that should go on the front of the flashcard
              </li>
              <li>
                Start a line with "A:" to specify the definition that should go on the back of the flashcard
              </li>
              <li>
                Each separator, term, and definition should start on its own line
              </li>
            </ul>
            <b>And you may add as many flashcards as needed!!</b>
          </div>
          <textarea cols="100" placeholder={placeholder} value={inputData} onChange={handleChange} />
        </div>
        <div className="flex-column-center">
          <button type="submit">Preview Flashcards</button>
        </div>
      </form>
    </div>
  )
}

export default FlashcardsForm;