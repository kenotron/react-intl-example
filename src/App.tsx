import React, { Component } from 'react';
import intl from 'react-intl-universal';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>{intl.get('hello', { name: 'world' })}</div>
        </header>
      </div>
    );
  }
}

export default App;
