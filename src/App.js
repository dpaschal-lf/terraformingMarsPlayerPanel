import React, { Component } from 'react';
import PlayerBoard from './components/playerBoard/PlayerBoard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PlayerBoard />
      </div>
    );
  }
}

export default App;
