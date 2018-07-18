import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ItemBook from './components/ItemBook';

class App extends Component {

  constructor(props){
      super(props);
      this.state = {
        books : [],
        title: ''
      }
    }


    componentDidMount(){
      axios({
        method: 'GET',
        url: 'http://52.37.92.74/api/books.json',
        data: null
      }).catch(err => {
        console.log(err);
      }).then(res => {
        this.setState({
          books : res.data.books
        });
        console.log(this.state.books);
        localStorage.setItem('books',JSON.stringify(this.state.books));
      });
    }

    onChange = (e) => {
      var target = e.target;
      var name = target.name;
      var value = target.value;
      this.setState({
        [name] : value
      });
    }

    onAdd = () => {
      var {books,title} = this.state;
      books.push({title: title});
      this.setState({
        books: books
      });
      localStorage.setItem('books',JSON.stringify(this.state.books));
    }

    findIndex = (id) => {
    var {books} = this.state;
    var result = -1;
    books.forEach((book,index) => {
      if (book.id === id) {
        result = index;
      }
    });
    return result;
  }

    onDelete = (id) => {
      console.log(id);
      var {books} = this.state;
      var index = this.findIndex(id);
      books.splice(index ,1);
      this.setState({
        books: books
      });
      localStorage.setItem('books',JSON.stringify(this.state.books));
    }


  render() {
    var that= this;
    if (localStorage.getItem('books') !== null) {
      var books = JSON.parse(localStorage.getItem('books'));
    }else{
      var { books} = this.state;
    }
    //
    
    var {title} = this.state;
      var showList = books.map(function(book, index) {
        return (
          <ItemBook 
        key={index} 
        index={index} 
        name={book.title} 
        id={book.id}
        onDelete = {that.onDelete}
        />

        );

      });
    

    return (
      
      <div className="row">
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          
          <table className="table table-hover">
            <thead>
              <tr>
                <th>id</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {showList}
            </tbody>
          </table>

          <input type="text" 
          name="title"
          value={title}
          onChange={this.onChange}
          />
          <button onClick={this.onAdd} type="button" className="btn btn-primary">Thêm</button>

        </div>
      </div>
    );
  }
}

export default App;
