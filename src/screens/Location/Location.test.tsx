import { createMemoryHistory } from 'history';
import React from 'react';
import {render} from '../../configuration/test-utils';
import Location from './Location';
import {Route, Router} from 'react-router-dom';

describe('Location', () => {
  test('screen renders and matches snapshot', () => {
    const history = createMemoryHistory();
    const url = '/location/1';
    history.push(url);
    const { asFragment } = render(
      <Router history={history}>
        <Route path="/location/:id">
          <Location />
        </Route>
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
