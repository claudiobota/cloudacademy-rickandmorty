import React from 'react';
import {render} from '../../configuration/test-utils';
import CharacterEpisodesDialog from './CharacterEpisodesDialog';
import mockData from '../../configuration/mock-data.json';
import {act} from '@testing-library/react';

describe('CharacterEpisodesDialog', () => {
  test('renders and matches snapshot', () => {
    let {asFragment} = render(<CharacterEpisodesDialog character={mockData.api.characters.results[0]} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders visible and matches snapshot',() => {
    const ref: any = React.createRef();
    const component = render(<CharacterEpisodesDialog ref={ref} character={mockData.api.characters.results[0]} />);

    act(() => {
      ref.current.show();
    });

    expect(component.asFragment()).toMatchSnapshot();
  });
});
