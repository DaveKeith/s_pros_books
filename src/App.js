import React, { Component, Fragment } from 'react';
import { Route } from "react-router-dom";
import './App.css';
import Home from './home'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Fragment>
        <header className="App-header">
          <h1 className="App-title">Sortable List of Books</h1>
        </header>
        <Route path="/" component={Home}/>
      </Fragment>
    );
  }
}

export default App;
