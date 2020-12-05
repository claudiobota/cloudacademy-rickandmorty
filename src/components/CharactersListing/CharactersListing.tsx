import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StoreState} from '../../types/redux-states';
import CharacterItem from '../CharacterItem/CharacterItem';
import {characterActions, fetchCharacters, selectAllCharacters} from '../../redux/slices/characterSlice';
import {Paginator} from 'primereact/paginator';
import config from '../../configuration/config';

export default function CharactersListing() {
  const dispatch = useDispatch();
  const characters = useSelector(selectAllCharacters);
  const status = useSelector((state: StoreState) => state.character.status);
  const page = useSelector((state: StoreState) => state.character.page);
  const count = useSelector((state: StoreState) => state.character.count);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCharacters(page));
    }
  }, [status, dispatch]);

  return (
    <div className="wrapper">
      <Paginator className="p-ml-auto p-mr-auto p-mb-5" rows={config.api.page_size} first={config.api.page_size * (page - 1)} totalRecords={count} onPageChange={e => dispatch(characterActions.changePage(e.page + 1))} />
      <div className="p-grid p-align-stretch">
        {characters.map((character, index) => {
          return (
            <div key={index} className="p-col-12 p-sm-4 p-mb-3 p-d-flex p-flex-column">
              <CharacterItem character={character} />
            </div>
          );
        })}
      </div>
      <Paginator className="p-ml-auto p-mr-auto p-mt-5" rows={config.api.page_size} first={config.api.page_size * (page - 1)} totalRecords={count} onPageChange={e => dispatch(characterActions.changePage(e.page + 1))} />
    </div>
  )
}
