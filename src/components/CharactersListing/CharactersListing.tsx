import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from '../../types/redux-states';
import CharacterItem from '../CharacterItem/CharacterItem';
import {characterActions, fetchCharacters, selectAllCharacters} from '../../redux/slices/characterSlice';
import {Paginator} from 'primereact/paginator';
import config from '../../configuration/config';
import {ICharacter} from '../../types/interfaces';

interface CharactersListingProps {
  characters: ICharacter[];
  hasPagination?: boolean;
  onPageChange?: (page: number) => void;
  page?: number;
  count?: number;
}
export default function CharactersListing(props: CharactersListingProps) {
  const count = props.count || 0;
  const page = props.page || 1;
  const onPageChange = props.onPageChange || ((page: number) => {});
  const characters = props.characters || [];
  const hasPagination = props.hasPagination === true;

  return (
    <div className="wrapper">
      {hasPagination && <Paginator className="p-ml-auto p-mr-auto p-mb-5" rows={config.api.page_size} first={config.api.page_size * (page - 1)} totalRecords={count} onPageChange={e => onPageChange(e.page + 1)} />}
      <div className="p-grid p-align-stretch">
        {characters.map((character, index) => {
          return (
            <div key={index} className="p-col-12 p-sm-4 p-mb-3 p-d-flex p-flex-column">
              <CharacterItem character={character} />
            </div>
          );
        })}
      </div>
      {hasPagination && <Paginator className="p-ml-auto p-mr-auto p-mt-5" rows={config.api.page_size} first={config.api.page_size * (page - 1)} totalRecords={count} onPageChange={e => onPageChange(e.page + 1)} />}
    </div>
  )
}
