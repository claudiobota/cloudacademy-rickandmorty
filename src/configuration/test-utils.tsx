import React from 'react';
import {render as rtlRender} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureAppStore} from '../redux/store';

function render(
  ui: React.ReactElement,
  {
    initialState,
    store = configureAppStore(initialState),
    ...renderOptions
  }: any = {}
) {
  function Wrapper({ children }: { children: React.ReactElement }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render }
