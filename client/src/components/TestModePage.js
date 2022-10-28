import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function TestModePage() {
  const [errors, setErrors] = useState([]);
  const [collection, setCollection] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
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
    setShowAnswer(false)
    setFlashcardNumber(flashcardNumber - 1)
  }

  function showNextCard() {
    setShowAnswer(false)
    setFlashcardNumber(flashcardNumber + 1)
  }

  function updateScore(value) {
    switch(score[flashcardNumber]) {
      case 'correct':
        if (value === 'correct') {
          setScore({...score,
            [flashcardNumber]: undefined,
          })
        } else if (value === 'incorrect') {
          setIncorrect(incorrect + 1)
          setScore({...score,
            [flashcardNumber]: value,
          })
        }
        setCorrect(correct - 1)
        break;
      case 'incorrect':
        if (value === 'correct') {
          setCorrect(correct + 1)
          setScore({...score,
            [flashcardNumber]: value,
          })
        } else if (value === 'incorrect') {
          setScore({...score,
            [flashcardNumber]: undefined,
          })
        }
        setIncorrect(incorrect - 1)
        break;
      default:
        if (value === 'correct') {
          setCorrect(correct + 1)
          setScore({...score,
            [flashcardNumber]: value,
          })
        } else if (value === 'incorrect') {
          setIncorrect(incorrect + 1)
          setScore({...score,
            [flashcardNumber]: value,
          })
        }
    }
  }

  function resetOrHome(value) {
    if (value === 'reset') {
      setShowAnswer(false)
      setFlashcardNumber(1)
      setScore({})
      setCorrect(0)
      setIncorrect(0)
      setFinished(false)
    } else {
      history.push('/')
    }
  }
  
  if ((!collection || collection.length === 0) && (!errors || errors.length === 0)) {
    return <h2 className="padding"><i className="fas fa-star-half-alt"/>&nbsp; Loading...</h2>
  }
  if ((!collection || collection.length === 0) && errors.length > 0) {
    return <h2 className="padding">{errors}</h2>
  }
  if (collection.flashcards.length === 0) {
    return <h2 className="padding">No flashcards to test &nbsp;<i className="far fa-frown"/></h2>
  }
  
  return (
    <div>
      {finished ? (
        <div className="padding flex-column-center">
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
          <h2 className="title">{collection.name}</h2>
          <br/>
          <div className={showAnswer ? "testing-card flipped" : "testing-card"} onClick={handleCardFlip}>
            <div className="flip-card-inner">
              <div className="flip-card-back">
                <p>{collection.flashcards[flashcardNumber - 1].answer}</p>
              </div>
              <div className="flip-card-front">
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
              <i className="fas fa-times-circle" onClick={() => updateScore("incorrect")} />
            ) : (
              <i className="far fa-times-circle" onClick={() => updateScore("incorrect")} />
            )}
            {score[flashcardNumber] === "correct" ? (
              <i className="fas fa-check-circle" onClick={() => updateScore("correct")} />
            ) : (
              <i className="far fa-check-circle" onClick={() => updateScore("correct")} />
            )}
            {flashcardNumber === collection.count ? <button className="invisible"/> : (
              <button onClick={showNextCard}>Next&nbsp;<i className="fas fa-angle-right"/></button>
            )}
          </div>
          <div className="fixed-position-bottom">
            <button className="blue-button" onClick={() => setFinished(true)}>Finish</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TestModePage;