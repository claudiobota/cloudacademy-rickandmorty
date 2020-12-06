import React from 'react';
import Home from './Home';
import {render} from '../../configuration/test-utils';

describe('Home', () => {
  test('screen renders and matches snapshot', () => {
    const { asFragment } = render(<Home /> );
    expect(asFragment()).toMatchSnapshot();
  });
});
