import React from "react";
import { useHistory } from "react-router-dom";
import Popup from 'reactjs-popup'

function TestModeSelection({ id, count, setShowDefinitionFirst }) {
  const history = useHistory();

  function setTestMode(value) {
    setShowDefinitionFirst(value)
    history.push(`/test_mode/${id}`)
  }

  return (
    <Popup
      trigger={
        <button disabled={count === 0} className="blue-button">Start Studying!</button>
      }
    >
      {close => (
        <div className="popup">
          <i className="fas fa-times" onClick={close} />
          <div className="flex-column-center center">
            <br/>
            <label>Start flashcards with term or definition?</label>
            <br/>
            <div>
              <button className="blue-button" onClick={() => setTestMode(false)}>Term</button>
              <button className="pink-button left-margin" onClick={() => setTestMode(true)}>
                Definition
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  )
}

export default TestModeSelection;