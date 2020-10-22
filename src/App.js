import React from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css';
import Traversal from "./Traversal";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="title">LabyAI</h1>
        <Traversal />
      </header>
    </div>
  );
}

export default App;
