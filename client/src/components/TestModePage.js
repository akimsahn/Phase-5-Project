import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function TestModePage({ showDefinitionFirst = false }) {
  const [errors, setErrors] = useState([]);
  const [collection, setCollection] = useState([]);
  const [showAnswer, setShowAnswer] = useState(showDefinitionFirst);
  const [flashcardNumber, setFlashcardNumber] = useState(1);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState({});
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const { id } = useParams();
  const history = useHistory();
  const randomPraiseArray = [ "Great job!", "You did splendidly!", "You killed it!", "Way to go!", "Congrats!",
    "That's impressive!", "You are amazing!", "Keep it up!", "You should be proud!", "You are one smart cookie!" ];

  useEffect(() => {
    fetch(`/collections/${id}`)
    .then(res => {
      if (res.ok) {
        res.json().then(collection => {
          setCollection(collection)
        })
      } else {
        res.json().then(err => setErrors(err.errors))
      }
    })
  }, [])

  function handleCardFlip() {
    setShowAnswer(!showAnswer)
  }

  function showPreviousCard() {
    setShowAnswer(showDefinitionFirst)
    setFlashcardNumber(flashcardNumber - 1)
  }

  function showNextCard() {
    setShowAnswer(showDefinitionFirst)
    setFlashcardNumber(flashcardNumber + 1)
  }

  function markAsCorrect() {
    if (score[flashcardNumber] === 'correct') {
      setScore({...score,
        [flashcardNumber]: undefined,
      })
      setCorrect(correct - 1)
    } else {
      setCorrect(correct + 1)
      if (score[flashcardNumber] === 'incorrect') {
        setIncorrect(incorrect - 1)
      }
      setScore({...score,
        [flashcardNumber]: 'correct',
      })
    }
  }

  function markAsIncorrect() {
    if (score[flashcardNumber] === 'incorrect') {
      setScore({...score,
        [flashcardNumber]: undefined,
      })
      setIncorrect(incorrect - 1)
    } else {
      setIncorrect(incorrect + 1)
      if (score[flashcardNumber] === 'correct') {
        setCorrect(correct - 1)
      }
      setScore({...score,
        [flashcardNumber]: 'incorrect',
      })
    }
  }

  function resetOrHome(value) {
    if (value === 'reset') {
      setShowAnswer(showDefinitionFirst)
      setFlashcardNumber(1)
      setScore({})
      setCorrect(0)
      setIncorrect(0)
      setFinished(false)
    } else {
      history.push('/')
    }
  }
  
  if (!collection || collection.length === 0) {
    if (!errors || errors.length === 0) {
      return <h2 className="padding"><i className="fas fa-star-half-alt"/>&nbsp; Loading...</h2>
    } else if (errors.length > 0) {
      return <h2 className="padding">{errors}</h2>
    }
  } else if (collection.flashcards.length === 0) {
    return <h2 className="padding">No flashcards to test &nbsp;<i className="far fa-frown"/></h2>
  }
  
  return (
    <div>
      {finished ? (
        <div className="padding flex-column-center center">
          <h1 className="praise">{randomPraiseArray[Math.floor(Math.random() * 10)]}</h1>
          <h2 className="title">{collection.name}</h2><br/>
          <h3 className="title">{collection.subject}</h3>
          <br/><br/>
          <h2>Your Score:</h2>
          <h3>{`${correct} Correct`}</h3>
          <h3>{`${incorrect} Incorrect`}</h3>
          <h3>{`${collection.count - correct - incorrect} Unanswered`}</h3>
          <br/>
          <span>
            <button className="blue-button" onClick={resetOrHome}>Return Home</button>
             &nbsp;  &nbsp; 
            <button className="pink-button" onClick={() => resetOrHome('reset')}>Try Again</button>
          </span>
        </div>
      ) : (
        <div className="padding flex-column-center">
          <h2 className="title center">{collection.name}</h2>
          <br/>
          <div className={showAnswer ? "testing-card flipped" : "testing-card"} onClick={handleCardFlip}>
            <div className="flip-card-inner">
              <div className="flip-card-back flex-column-center">
                <p>{collection.flashcards[flashcardNumber - 1].answer}</p>
              </div>
              <div className="flip-card-front flex-column-center">
                <p>{collection.flashcards[flashcardNumber - 1].question}</p>
              </div>
            </div>
          </div>
          <h3>{`${flashcardNumber} / ${collection.count}`}</h3>
          <div className="flex-row-space-between testing-buttons bottom-margin">
            {flashcardNumber === 1 ? <button className="invisible"/> : (
              <button onClick={showPreviousCard}><i className="fas fa-angle-left"/>&nbsp;Previous</button>
            )}
            {score[flashcardNumber] === "incorrect" ? (
              <i className="fas fa-times-circle" onClick={markAsIncorrect} />
            ) : (
              <i className="far fa-times-circle" onClick={markAsIncorrect} />
            )}
            {score[flashcardNumber] === "correct" ? (
              <i className="fas fa-check-circle" onClick={markAsCorrect} />
            ) : (
              <i className="far fa-check-circle" onClick={markAsCorrect} />
            )}
            {flashcardNumber === collection.count ? <button className="invisible"/> : (
              <button onClick={showNextCard}>Next&nbsp;<i className="fas fa-angle-right"/></button>
            )}
          </div>
          <div className="fixed-position-bottom flex-column-center">
            <button className="blue-button" onClick={() => setFinished(true)}>Finish</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TestModePage;