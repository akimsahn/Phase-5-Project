import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const style = {
  "fontSize": "48px",
  "fontWeight": "bold",
  "textDecoration": "none",
  "color": "white"
}

function NavBar({ user, setUser, setCollections }) {
  const history = useHistory();

  function handleLogout() {
    fetch("/logout", { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setUser(null);
          setCollections(null);
          history.push('/')
        }
      });
  }

  return (
    <div className="navbar">
      <div className='nav-left'>
        <Link to='/' style={style}>QuiXtudy</Link>
      </div>
      <div className='nav-right'>
        <p>Hello, {user.username}!</p>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  )
}

export default NavBar;