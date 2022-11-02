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
          "out of need for a quicker way to make flashcards for studying. Other flashcard applications out there " +
          "only allow users to create flashcards one at a time, which can be very time consuming. This application " +
          "ultimately helps you save that precious time to spend on actually studying the material, not prepping it."
        }
      </p>
      <br/>
      <h4>With QuiXtudy, you can:</h4>
      <div className="about-elements">
        <div className="padding flex-column-center center">
          <i className="fas fa-clone" style={{"fontSize": "64px"}} />
          <br/>
          <p>Quickly create and add multiple flashcards - as many as needed - to a collection using a single input.</p>
        </div>
        <div className="padding flex-column-center center">
          <i className="fas fa-users" style={{"fontSize": "64px"}} />
          <br/>
          <p>Share an entire collection of flashcards with other users of the app through a simple click-and-search.</p>
        </div>
        <div className="padding flex-column-center center">
          <i className="fas fa-user-edit" style={{"fontSize": "64px"}} />
          <br/>
          <p>Edit or remove any of your collections and/or flashcards after they've been created or even shared with you.</p>
        </div>
      </div>
    </div>
  )
}

export default About;