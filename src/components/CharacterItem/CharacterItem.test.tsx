import React from 'react';
import {fireEvent, render, screen} from '../../configuration/test-utils';
import CharacterItem from './CharacterItem';
import mockData from '../../configuration/mock-data.json';

describe('CharacterItem', () => {
  test('component renders and matches snapshot', () => {
    const {asFragment} = render(<CharacterItem character={mockData.api.characters.results[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('CharacterEpisodesDialog is correctly shown when clicking View Episodes button', () => {
    const {container} = render(<CharacterItem character={mockData.api.characters.results[0]} />);
    expect(container.getElementsByClassName('p-dialog-visible').length).toBeFalsy();
    fireEvent.click(screen.getByText('View Episodes'));
    expect(container.getElementsByClassName('p-dialog-visible').length).toBeTruthy();
  });
});
