import React, { Component } from "react";
import "../css/SearchBar.css";

class SearchBar extends Component {
  state = { term: "" };

  onInputChange = (event) => {
    this.setState({ term: event.target.value });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onTermSubmit(this.state.term);
    this.setState({ term: "" });
  };

  render() {
    console.log(this.props.darkMode)
    return (
      <div
        className="search-bar ui segment"
      >
        <div className="logo">
          <h3>ThouTube</h3>
        </div>
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <div
              class="ui action input"
            >
              <input
                type="text"
                value={this.state.term}
                onChange={this.onInputChange}
                placeholder="Search"
              />
              <button class="ui icon button">
                <i class="search icon"></i>
              </button>
            </div>
          </div>
        </form>
        <div class="ui toggle checkbox" >
          <input type="checkbox" name="public" onClick={this.props.toggleDisplayMode}/>
          <label className="coloring black"></label>
        </div>{" "}
      </div>
    );
  }
}

export default SearchBar;
