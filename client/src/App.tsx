import React from 'react';
import logo from './logo.svg';
import './App.css';

function itDoesntMatter() {
  fetch("http://localhost:9000/tasks/")
  .then(response => console.log(response))
  .catch(err => console.log(`${err}`));
}

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={itDoesntMatter}>Click here</button>
        <p>Hello</p>
      </header>
    </div>  
  );
}

export default App;
