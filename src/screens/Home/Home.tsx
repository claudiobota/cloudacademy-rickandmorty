import React from 'react';
import ApiService from '../../services/api';
import CharactersListing from '../../components/CharactersListing/CharactersListing';
import {useDispatch} from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();

  return (
    <div className="container">
      <CharactersListing />
    </div>
  )
}
