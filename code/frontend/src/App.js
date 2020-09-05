import React from 'react';
import Header from './components/header'
import respond from "./apiCalls";
import './App.css';

function App() {
  respond('Wie ist das Wetter heute?')
  return (
    <div className="App">
      <Header/>
      <div className="App-header">
          main
      </div>
    </div>
  );
}

export default App;
