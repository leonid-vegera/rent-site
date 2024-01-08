import React from 'react';
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import './Header.scss'

export function Header({ toggleModal, onRemoveText, onSearch, inputText }) {
  return (
    <div className='header'>
      <div className="header__control">
        <CiSearch className='header__control-search'/>
        <input
          type="text"
          className='header__control-input'
          placeholder='Я хочу орендувати'
          value={inputText}
          onChange={(event) => onSearch(event.target.value)}
        />
        {inputText && (
          <RxCross2
            className='header__control-close'
            onClick={onRemoveText}
          />
        )}
      </div>
      <button className="header__rental" onClick={toggleModal}>
        Здати в оренду
      </button>

    </div>
  );
}
