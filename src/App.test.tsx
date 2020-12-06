import React from 'react';
import App from './App';
import {render} from './configuration/test-utils';

describe('App', () => {
  test('app renders and matches snapshot', () => {
    const {asFragment} = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
