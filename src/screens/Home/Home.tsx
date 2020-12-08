import React, {useEffect} from 'react';
import CharactersListing from '../../components/CharactersListing/CharactersListing';
import {useDispatch, useSelector} from 'react-redux';
import {characterActions, fetchCharacters, selectAllCharacters} from '../../redux/slices/characterSlice';
import {StoreState} from '../../types/redux-states';

export default function Home() {
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

  const onPageChange = (page: number) => {
    dispatch(characterActions.changePage(page));
  }

  return (
    <div className="container">
      <CharactersListing characters={characters} page={page} count={count} onPageChange={onPageChange} hasPagination={true} />
    </div>
  )
}
