import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from './Modal';
import { Provider } from 'react-redux'
import { store } from '../GlobalRedux/store'
import '@testing-library/jest-dom'

describe('Modal', () => {
jest.mock('../assets/icons/close.svg', () => 'mocked-file-path.svg');

  beforeEach(() => {
    render(<Provider store={store}><Modal /></Provider>);
  });

  test('renders modal component', () => {
    const { container } = render(<Provider store={store}><Modal /></Provider>);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('renders movie year', () => {
    expect(screen.getByText('Genre')).toBeInTheDocument();
  });

  test('renders movie genres', () => {
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  test('renders movie overview', () => {
    expect(screen.getByText('Director')).toBeInTheDocument();
  });

  test('renders movie runtime', () => {
    expect(screen.getByText('Runtime')).toBeInTheDocument();
  });

  test('renders movie rating', () => {
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });

  test('renders movie vote count', () => {
    expect(screen.getByText('Votes')).toBeInTheDocument();
  });

  test('renders movie revenue', () => {
    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });
});
