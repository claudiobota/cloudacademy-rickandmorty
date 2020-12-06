import {render} from '../../configuration/test-utils';
import React from 'react';
import CharactersListing from './CharactersListing';

describe('CharactersListing', () => {
  test('component renders and matches snapshot', () => {
    const { asFragment } = render(<CharactersListing /> );
    expect(asFragment()).toMatchSnapshot();
  });
});
