import React, { Component } from 'react'
import { ImSearch } from 'react-icons/im';
import { Notify } from 'notiflix'
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    searchQuery: "",
  }


  handleChange = (evt) => {
    this.setState({ searchQuery: evt.target.value})
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    if (this.state.searchQuery.trim()==="") {
      Notify.warning("Please enter a valid search query", {
        clickToClose: true,
        timeout: 3000,
        cssAnimationStyle: 'zoom',
      });
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: "" });
    evt.target.reset();
  }
  
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            {/* <span className={css.buttonLabel}>Search</span> */}
            <ImSearch color="white" size="18" />
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleChange}
            required
          />
        </form>
      </header>
    );
  };
}