import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function MakeCollectionPage({ setCollections }) {
  const [errors, setErrors] = useState([]);
  const [collectionData, setCollectionData] = useState({
    name: "",
    subject: "",
    short_description: ""
  })
  const history = useHistory();

  function handleChange(e) {
    setCollectionData({...collectionData,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch('/collections', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(collectionData)
    }).then(res => {
      if (res.ok) {
        res.json().then(collection => {
          setCollections([collection])
          history.push(`/make_flashcards/${collection.id}`)
        })
      } else {
        res.json().then(err => setErrors(err.errors))
      }
    })
  }

  return (
    <div className="padding flex-column-center">
      <h2 className="title">Create a New Collection</h2>
      <br/>
      <form className="user-form" onSubmit={handleSubmit}>
        <label>Collection Name:</label><br/>
        <input type='text' name='name' value={collectionData.name} onChange={handleChange} /><br/>
        <label>Subject:</label><br/>
        <input type='text' name='subject' value={collectionData.subject} onChange={handleChange} /><br/>
        <label>Short Description:</label><br/>
        <textarea rows='7' name='short_description' value={collectionData.short_description} onChange={handleChange} /><br/>
        {errors.map((err) => (
              <p className='error'>{err}</p>
        ))}
        <div className="flex-column-center">
          <button type='submit'>Create Collection</button>
        </div>
      </form>
    </div>
  )
}

export default MakeCollectionPage;