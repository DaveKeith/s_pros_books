import React, { Component, Fragment } from 'react';
import './App.css';
import BookIcon from './book-icon';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      sortedBooks: [],
      displayedBooks: [],
      character: "all",
      author: "all",
    };

    this.changeFirstLetter = this.changeFirstLetter.bind(this);
    this.changeAuthor = this.changeAuthor.bind(this);
  }

  getBooks(){
    fetch('https://servicepros-test-api.herokuapp.com/api/v1/books', {
      mode: "cors",
    })
    .then(res => res.json())
    .then(books => {
      this.setState({
        books,
      });
    })
    .then(() => {
      this.setState({
        sortedBooks: this.state.books.sort(this.compareByTitle),
        displayedBooks: this.state.books.sort(this.compareByTitle)
      });
    });
  }

  componentDidMount(){
    this.getBooks();
  }

  compareByTitle(a, b) {
    let titleA = a.title.toUpperCase();
    let titleB = b.title.toUpperCase();
    let comparison = 0;
    if (titleA > titleB) {
      comparison = 1;
    } else if (titleA < titleB) {
      comparison = -1;
    }
    return comparison;
  }

  changeFirstLetter(event){
    const value = event.target.value;
    const filtered = this.state.sortedBooks.filter((book) => {
        if(value === "all"){
          return true;
        }else if (value === "number") {
          return parseInt(book.title) > 0;
        }else{
          return book.title.charAt(0) === value;
        }
      });

    this.setState({
      character: value,
      displayedBooks: filtered,
    });
  }

  changeAuthor(event){
    const value = event.target.value;
    const filtered = this.state.sortedBooks.filter((book) => {
        if(value === "all"){
          return true;
        }else{
          return book.author === value
        }
      });

    this.setState({
      author: value,
      displayedBooks: filtered,
    });
  }

  render() {
    let authors = this.state.displayedBooks.map(book => book.author)
      .filter((elem, index, self) => {
          return index === self.indexOf(elem);
      })
      .sort();
    let chars = this.state.displayedBooks.map(book => book.title.charAt(0))
      .filter((elem, index, self) => {
          return index === self.indexOf(elem);
      })
      .sort()
      .map((myChar) => {
          if(!isNaN(myChar)){
            myChar = "number";
          }
          return myChar;
      });

    return (
      <Fragment>
        <div className="filters">
          <div id="filter-title">Filters</div>
          <div id="filter-by-title">Filter by First Letter:
            <select onChange={this.changeFirstLetter}>
              <option value="all">all</option>
              {chars.map(char => <option value={char} key={char}>{char}</option>)}
            </select>
          </div>
          <div id="filter-by-author">Filter by author:
            <select onChange={this.changeAuthor}>
              <option value="all">all</option>
              {authors.map(author => <option value={author} key={author}>{author}</option>)}
            </select>
          </div>
        </div>
        <div className="books">
          {this.state.displayedBooks.map(book =>
            <BookIcon key={book.title} title={book.title} author={book.author}/>
          )}
        </div>
      </Fragment>
    );
  }
}

export default App;
