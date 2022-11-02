import React, { useState } from "react";
import Popup from 'reactjs-popup'

function UserSearch({ collection, user }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setUsername(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch(`/share_collection/${username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: collection.id,
        name: `(Shared by ${user.username}) ${collection.name}`,
        subject: collection.subject,
        description: collection.short_description
      })
    }).then(res => {
      if (res.ok) {
        res.json().then(data => {
          setMessage(data.message)
          setUsername("")
          setError("")
        })
      } else {
        res.json().then(err => {
          setMessage("")
          setError(err.errors)
        })
      }
    })
  }

  function resetStates() {
    setUsername("")
    setMessage("")
    setError("")
  }
  
  return (
    <Popup
      trigger={
        <button className="pink-button"><i className="fas fa-paper-plane" />&nbsp; Share Collection</button>
      }
      onClose={resetStates}
    >
      {close => (
        <div className="popup">
          <i className="fas fa-times" onClick={close} />
          <form className="flex-column-center center" onSubmit={handleSubmit}>
            <br/>
            <label>Enter username to share collection with:</label>
            <input value={username} onChange={handleChange} />
            {!error ? null : <p className="error"><i class="far fa-sad-tear"/>&nbsp;{error}</p>}
            {!message ? null : <p className="green-message"><i class="far fa-laugh-beam"/>&nbsp;{message}</p>}
            <button>Share Collection</button>
          </form>
        </div>
      )}
    </Popup>
  )
}

export default UserSearch;