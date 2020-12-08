import React from 'react';
import Error from './Error';
import {render} from '../../configuration/test-utils';

describe('Error', () => {
  test('screen renders and matches snapshot', () => {
    const {asFragment} = render(<Error />);
    expect(asFragment()).toMatchSnapshot();
  });
});
