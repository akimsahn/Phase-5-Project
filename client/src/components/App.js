import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import NavBar from "./NavBar";
import CollectionDetailsPage from "./CollectionDetailsPage";
import CollectionsPage from "./CollectionsPage";
import MakeCollectionPage from "./MakeCollectionPage";
import MakeFlashcardsPage from "./MakeFlashcardsPage";
import TestModePage from "./TestModePage";
import About from "./About";

function App() {
  const [user, setUser] = useState(null);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    // auto-login
    fetch("/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setUser(user)
          setCollections(user.collections)
        })
      }
    });
  }, []);

  function handleCollectionUpdate(updatedCollection, method) {
    if (method === 'update') {
      setCollections(collections.map(collection => (
        collection.id === updatedCollection.id ? updatedCollection : collection
      )))
    } else if (method === 'delete') {
      setCollections(collections.filter(collection => collection.id !== updatedCollection.id))
    }
  }

  if (!user) return <LoginPage setUser={setUser} setCollections={setCollections} />;

  return (
    <BrowserRouter>
      <div>
        <NavBar user={user} setUser={setUser} setCollections={setCollections} />
        <Switch>
          <Route exact path="/">
            <CollectionsPage collections={collections} setCollections={setCollections} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/collection/:id">
            <CollectionDetailsPage user={user} handleCollectionUpdate={handleCollectionUpdate} />
          </Route>
          <Route exact path="/new_collection">
            <MakeCollectionPage setCollections={setCollections} />
          </Route>
          <Route exact path="/make_flashcards/:id">
            <MakeFlashcardsPage collections={collections} />
          </Route>
          <Route exact path="/test_mode/:id">
            <TestModePage collections={collections} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;