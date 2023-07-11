import React from 'react';
import { render } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { Provider } from 'react-redux'
import { store } from '../GlobalRedux/store'
import '@testing-library/jest-dom'

test('renders Navbar component', () => {
  const { container } = render(<Provider store={store}><Navbar /></Provider>)
  expect(container.firstChild).toBeInTheDocument();
});