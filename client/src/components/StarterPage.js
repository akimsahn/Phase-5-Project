import React from "react";
import { useHistory } from "react-router-dom";
import About from "./About";

function StarterPage() {
  const history = useHistory(); 

  function routeToNewCollection() {
    history.push('/new_collection')
  }

  return (
    <div className="padding flex-column-center">
      <About />
      <button className="bottom-margin" onClick={routeToNewCollection}>Let's Get To Work!</button>
    </div>
  )
}

export default StarterPage;