import React from 'react';
import { render } from '@testing-library/react';
import Navbar from '../components/Navbar';

test('renders Navbar component', () => {
  const { container } = render(<Navbar />);
  expect(container.firstChild).toBeInTheDocument();
});
