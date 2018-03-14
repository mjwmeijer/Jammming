import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      term:''
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handlePressEnter = this.handlePressEnter.bind(this);
  }

  search(){
    this.props.onSearch(this.state.term);
  }

  handleTermChange(e){
      this.setState({
      term: e.target.value
    })
  }

  /*
  render () {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  } */
  handlePressEnter(e){
    console.log(e.key);//dit wordt netjes geprint
    console.log(e.target.value);//als je abc invult, wordt hier ab getoond. Na de enter wordt het wel abc maar hij zoekt dan op ab
    if(e.key =="Enter"){
      this.search();
    }
  }


  render () {
      return (
        <div className="SearchBar">
          <input placeholder="Enter A Song, Album, or Artist. Press Enter or button to search" onChange={this.handleTermChange} onKeyPress={this.handlePressEnter}/>
          <a onClick={this.search}>SEARCH</a>
        </div>
      );
    }
};
