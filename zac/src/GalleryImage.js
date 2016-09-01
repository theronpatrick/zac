import React, { Component } from 'react';

class GalleryImage extends Component {

  componentWillMount() {
    // Get width from 300 to 1000 to force a random image (apparently ?random param doesn't work with same dimensions?)
    let random = Math.floor(Math.random() * (500 - 300) + 300);

    this.setState({
      loaded: false,
      src: "https://source.unsplash.com/category/nature/300x" + random
    })
  }

  _onLoad = () => {
    this.setState({
      loaded: true
    })
  }

  render() {
    let title = "Majestic Stock Photo"
    

    let loadingStyle = {
      opacity: this.state.loaded === true ? 0 : 1
    }

    return <span className="image-wrapper">
      <img src={this.state.src} alt={title} title={title} onLoad={this._onLoad}></img>
      <div className="loading-cover ease-in" style={loadingStyle}>Loading...</div>
      </span>
  }
}

export default GalleryImage;
