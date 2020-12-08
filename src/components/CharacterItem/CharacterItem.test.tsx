import React from 'react';
import {fireEvent, render, screen} from '../../configuration/test-utils';
import CharacterItem from './CharacterItem';
import mockData from '../../configuration/mock-data.json';
import {ICharacter} from '../../types/interfaces';
import {Route, Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const renderWithRouter = (character: ICharacter) => {
  const history = createMemoryHistory();
  history.push('/');

  return (
    <Router history={history}>
      <Route path="/">
        <CharacterItem character={character} />
      </Route>
    </Router>
  )
};

describe('CharacterItem', () => {
  test('component renders and matches snapshot', () => {
    const {asFragment} = render(renderWithRouter(mockData.api.characters.results[0]));
    expect(asFragment()).toMatchSnapshot();
  });

  test('CharacterEpisodesDialog is correctly shown when clicking View Episodes button', () => {
    const {container} = render(renderWithRouter(mockData.api.characters.results[0]));
    expect(container.getElementsByClassName('p-dialog-visible').length).toBeFalsy();
    fireEvent.click(screen.getByText('View Episodes'));
    expect(container.getElementsByClassName('p-dialog-visible').length).toBeTruthy();
  });
});
