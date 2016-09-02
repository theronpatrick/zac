import React, { Component } from 'react';
import GalleryImage from './GalleryImage'
import './styles/app.scss'; 
import $ from 'jquery';
var sanitizeHtml = require('sanitize-html');

class App extends Component {

  componentWillMount() {
      this.setState({
        javascriptEnabled: false,
        imageIndex: 0,
        imageArray: [],
        imageDescriptions: []
      })  
  }

  _javascriptify = (e) => {
    let newArray = [<GalleryImage key={0} />]
    this.setState({
      imageArray: newArray,
      javascriptEnabled: true
    })
    this._getDescription(0)
  }

  _nextImage = (e) => {

    // Do nothing if JS is not enabled
    if (!this.state.javascriptEnabled) {
      return
    }

    let newIndex = this.state.imageIndex + 1

    // Need to make new array since pushing directly to state is considered unsafe (if we push to it)
    let newArray = this.state.imageArray;

    // If we're at end of array, push new image
    if (newIndex === this.state.imageArray.length) {
      newArray.push(<GalleryImage key={newIndex} />);
      // Also get random descriptions for each image just for fun
      this._getDescription(newIndex);
    }
    
    this.setState({
      imageArray: newArray,
      imageIndex: this.state.imageIndex + 1
    })

  }

  _getDescription(index) {
    $.get({
      url: "http://dinoipsum.herokuapp.com/api/?format=html&paragraphs=1&words=7"
    })
    .then((data) => {
      let newDescriptions = this.state.imageDescriptions;
      newDescriptions[index] = data;
      this.setState({
        imageDescriptions: newDescriptions
      })
    })
  }

  _previousImage = (e) => {
    // Do nothing if JS is not enabled
    if (!this.state.javascriptEnabled) {
      return
    }

    if (this.state.imageIndex !== 0) {
      this.setState({
        imageIndex: this.state.imageIndex -1
      })
    }
  }
  
  render() {
    let title = "Majestic Stock Photo"
    let description = "Randomly selected for your viewing pleasure"

    let currentImage;
    if (!this.state.javascriptEnabled) {
      currentImage = <GalleryImage />
    } else {
      // Build image gallery and set appropriate style
      let galleryStyle = {
        width: 300 * this.state.imageArray.length,
        marginLeft: 0 - this.state.imageIndex * 300
      }
      currentImage = <div className="image-gallery slideshow-transition" style={galleryStyle}>{this.state.imageArray}</div>;

      // Set description
      description = sanitizeHtml(this.state.imageDescriptions[this.state.imageIndex], {allowedTags: []})
    }

    return (
      <div className="app">
        <div className="app-header">
          <h1>Pure HTML/CSS Image <button role="button" onClick={this._javascriptify}>Click to javascriptify</button></h1>
        </div>
        <div className="image-container">
            <div className="image-title ease-in">{title} 
              <div className="image-nav-aligner">
                <button role="button" aria-label="previous" onClick={this._previousImage}>&lt;</button> 
                <button role="button" aria-label="next" onClick={this._nextImage}>&gt;</button>
              </div>
            </div>
            {currentImage}
            <div className="image-description ease-in">{description}</div>
        </div>
      </div>
    );
  }
}

export default App;