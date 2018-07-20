import React, { Component } from 'react';

class BookIcon extends Component{
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render(){
    return(
      <a href={`https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Dstripbooks&field-keywords=${this.props.title}`}
        target="_blank"
        id="book-container">
        <div id="book-info">
          <div id="title">{this.props.title}</div>
          <div id="author">by {this.props.author || "N/A"}</div>
        </div>
      </a>
    )
  }
}

export default BookIcon
