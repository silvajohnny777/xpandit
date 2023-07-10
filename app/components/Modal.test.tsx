import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
jest.mock('../assets/icons/close.svg', () => 'mocked-file-path.svg');

  beforeEach(() => {
    render(<Modal />);
  });

  test('renders movie title', () => {
    expect(screen.getByText('Mock Movie')).toBeInTheDocument();
  });

  test('renders movie year', () => {
    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  test('renders movie genres', () => {
    expect(screen.getByText('Genre 1, Genre 2, Genre 3')).toBeInTheDocument();
  });

  test('renders movie overview', () => {
    expect(screen.getByText('Mock movie overview')).toBeInTheDocument();
  });

  test('renders movie runtime', () => {
    expect(screen.getByText('120 mins')).toBeInTheDocument();
  });

  test('renders movie rating', () => {
    expect(screen.getByText('7.5')).toBeInTheDocument();
  });

  test('renders movie vote count', () => {
    expect(screen.getByText('2000')).toBeInTheDocument();
  });

  test('renders movie revenue', () => {
    expect(screen.getByText('$1,000,000')).toBeInTheDocument();
  });
});
