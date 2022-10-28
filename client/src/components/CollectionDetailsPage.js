import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import FlashcardsList from "./FlashcardsList";
import UserSearch from "./UserSearch";

function CollectionDetailsPage({ user, handleCollectionUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [collection, setCollection] = useState([]);
  const [updatedCollection, setUpdatedCollection] = useState([]);
  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch(`/collections/${id}`)
      .then(res => {
        if (res.ok) {
          res.json().then(collection => {
            setCollection(collection)
            setUpdatedCollection(collection)
          })
        } else {
          res.json().then(err => setErrors(err.errors))
        }
      })
  }, [])

  function switchToEditMode() {
    setEditMode(true)
  }

  function handleChange(e) {
    setUpdatedCollection({...updatedCollection,
      [e.target.name]: e.target.value,
    })
  }

  function handleCancel() {
    setUpdatedCollection(collection)
    setErrors([])
    setEditMode(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch(`/collections/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedCollection)
    }).then(res => {
      if (res.ok) {
        res.json().then(collection => {
          setCollection(collection)
          handleCollectionUpdate(collection, 'update')
          setEditMode(false)
        })
      } else {
        res.json().then(err => setErrors(err.errors))
      }
    })
  }

  function handleDelete() {
    fetch(`/collections/${id}`, {method: 'DELETE'})
      .then(res => {
        if (res.ok) {
          res.json().then(collection => {
            handleCollectionUpdate(collection, 'delete')
            history.push('/')
          })
        } else {
          res.json().then((err) => console.log(err.errors))
        }
      })
  }

  function setFlashcardData(flashcardId) {
    setCollection({...collection,
      flashcards: collection.flashcards.filter(flashcard => flashcard.id !== flashcardId)
    })
  }

  function pushHistory(url) {
    history.push(url)
  }
  
  if ((!collection || collection.length === 0) && (!errors || errors.length === 0)) {
    return <h2 className="padding"><i className="fas fa-star-half-alt"/>&nbsp; Loading...</h2>
  }
  if ((!collection || collection.length === 0) && errors.length > 0) {
    return <h2 className="padding">{errors}</h2>
  }

  return (
    <div>
      {editMode ? (
        <div className="collection-info">
          {errors.map((err) => (
                <p className="error">{err}</p>
              ))}
          <form onSubmit={handleSubmit}>
            <div className="inline-block name-block">
              <label>Collection Name:</label><br/>
              <input
                type='text'
                name='name'
                value={updatedCollection.name}
                onChange={handleChange}
              />
            </div>
            <div className="inline-block subject-block">
              <label>Subject:</label><br/>
              <input
                type='text'
                name='subject'
                value={updatedCollection.subject}
                onChange={handleChange}
              />
            </div>
            <div className="description-box">
              <label>Description:</label><br/>
              <textarea
                name='short_description'
                rows="3"
                value={updatedCollection.short_description}
                onChange={handleChange}
              />
            </div>
            <div className="buttons">
              <div>
                <button type='submit'>Save</button>
                <button className='cancel-button' onClick={handleCancel}>Cancel</button>
              </div>
                <button type="button" className="delete-button" onClick={handleDelete}>
                  Delete Collection
                </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="collection-info">
          <div className="inline-block name-block">
            <label>Collection Name:</label>
            <h2>{collection.name}</h2>
          </div>
          <div className="inline-block subject-block">
            <label>Subject:</label>
            <h2>{collection.subject}</h2>
          </div>
          <div className="description-box">
            <label>Description:</label>
            <p>{collection.short_description}</p>
          </div>
          <div className="buttons">
            <button onClick={switchToEditMode}><i className="fas fa-edit" />&nbsp; Edit Collection</button>
            <UserSearch collection={collection} user={user} />
          </div>
        </div>
      )}
      <div className="padding">
        <div className="flex-row-space-between">
          <h2 className="title">Flashcards</h2>
          <button onClick={() => pushHistory(`/make_flashcards/${id}`)}>+ Add Flashcards</button>
        </div>
        <FlashcardsList
          collectionId={id}
          flashcardData={collection.flashcards}
          setFlashcardData={setFlashcardData}
          inDatabase={true}
          setErrors={setErrors}
        />
        <div className="fixed-position-bottom">
          <button
            disabled={collection.count === 0}
            className="blue-button"
            onClick={() => pushHistory(`/test_mode/${id}`)}
          >
            Start Studying!
          </button>
        </div>
      </div>
    </div>
  )
}

export default CollectionDetailsPage;