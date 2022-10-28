import React from "react";

function About() {
  return (
    <div className="padding flex-column-center">
      <div className="center">
        <i className="fas fa-laptop-code" style={{"fontSize": "64px"}} />
        <h1 className="praise">Welcome to QuiXtudy!</h1>
      </div>
      <p className="center">
        {
          "Pronounced 'quick study' -- " +
          "This application was created by the request of a medical student at VCOMM (shoutout to Ashley) " +
          "out of need for a quicker way to make flashcards. Most other flashcard applications out there only " +
          "allow for creating flashcards one at a time, which can be very time-consuming. This application was " +
          "built to ultimately help you save and spend that time on actually studying the material, not prepping it."
        }
      </p>
      <div className="flex-row-space-between">
        <div className="padding flex-column-center center">
          <i className="fas fa-clone" style={{"fontSize": "64px"}} />
          <p>Quickly create and add as many flashcards as needed to a collection using a single input.</p>
        </div>
        <div className="padding flex-column-center center">
        <i className="fas fa-users" style={{"fontSize": "64px"}} />
          <p>Share an entire collection of flashcards with other users of the app through a simple click-and-search.</p>
        </div>
        <div className="padding flex-column-center center">
        <i className="fas fa-user-edit" style={{"fontSize": "64px"}} />
          <p>Edit or remove your collections or individual flashcards after they've been created or shared with you.</p>
        </div>
      </div>
    </div>
  )
}

export default About;