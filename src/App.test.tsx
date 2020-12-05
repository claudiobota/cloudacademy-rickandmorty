import React from 'react';
import App from './App';
import { render, screen } from '@testing-library/react';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    screen.debug();
  });
});
