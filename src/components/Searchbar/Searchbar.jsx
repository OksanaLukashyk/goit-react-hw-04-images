import React, { useState } from 'react'
import { ImSearch } from 'react-icons/im';
import { Notify } from 'notiflix'
import css from './Searchbar.module.css';

export const Searchbar = ({onSubmit}) => {

  const [searchQuery, setSearchquery] = useState("");


  const handleChange = (evt) => {
    setSearchquery(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (searchQuery.trim()==="") {
      Notify.warning("Please enter a valid search query", {
        clickToClose: true,
        timeout: 3000,
        cssAnimationStyle: 'zoom',
      });
      return;
    }

    onSubmit(searchQuery);
    setSearchquery("");
    evt.target.reset();
  }
  
  return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={handleSubmit}>
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
            value={searchQuery}
            onChange={handleChange}
            required
          />
        </form>
      </header>
  );
}