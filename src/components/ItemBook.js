import React, { Component } from 'react';

class ItemBook extends Component {

  constructor(props){
      super(props);
    }

  onDelete = () => {
    this.props.onDelete(this.props.id);
    console.log(this.props.id);
  }

  render() {
    var {book} = this.props;
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>{this.props.name}</td>
        <td><button onClick={this.onDelete} type="button" className="btn btn-danger">Xóa</button></td>
      </tr>
    );
  }
}

export default ItemBook;
