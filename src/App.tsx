import React, { Component } from 'react';
import './App.css';
import intl from 'react-intl-universal';

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
