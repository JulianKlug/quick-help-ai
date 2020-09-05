import React from 'react';
import logo from './logo.svg';
import respond from "./apiCalls";
import './App.css';

function App() {
  respond('Wie ist das Wetter heute?')
  return (
    <div className="App">
      <header className="App-header">
        Header
      </header>
      <div className="App-header">
          main
      </div>
    </div>
  );
}

export default App;
