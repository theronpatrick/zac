import React, { Component } from 'react';
import './styles/app.scss'; 

class App extends Component {
  
  render() {
    let title = "Majestic Stock Photo"

    return (
      <div className="app">
        <div className="app-header">
          <h1>Pure HTML/CSS Image <button role="button">Click to javascriptify</button></h1>
        </div>
        <div className="image-container">
            <div className="image-title ease-in">{title} <button role="button" aria-label="previous">&lt;</button> <button role="button" aria-label="next">&gt;</button></div>
            <img src="https://unsplash.it/300/300/?random" alt={title} title={title}></img>
            <div className="image-description ease-in">Randomly selected for your viewing pleasure</div>
        </div>
      </div>
    );
  }
}

export default App;
