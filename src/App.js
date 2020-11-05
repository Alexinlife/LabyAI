import React from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css';
import TraversalLargeur from "./TraversalLargeur";
import TraversalProfondeur from "./TraversalProfondeur";
import Disjkstra from "./Disjkstra";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="title">LabyAI</h1>
        <Disjkstra />
        <TraversalLargeur />
        <TraversalProfondeur />
      </header>
    </div>
  );
}

export default App;
