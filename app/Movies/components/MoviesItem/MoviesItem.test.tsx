import React from 'react';
import { render, screen } from '@testing-library/react';
import MoviesItem from './MoviesItem';
import { Provider } from 'react-redux';
import { store } from '../../../GlobalRedux/store' 

describe('MoviesItem', () => {
  const mockMovie = {
    id: 1,
    title: 'Mock Movie',
    release_date: '2023-01-01',
    vote_average: 7.5,
    vote_count: 2000,
    adult: false,
    genre_ids: [1, 2, 3],
    original_language: 'en',
    original_title: 'Mock Original Title',
    overview: 'Mock movie overview',
    poster_path: '/mock-poster.jpg',
  };

  test('renders example component', () => {
    render(<Provider store={store}><MoviesItem position={1} movie={mockMovie} /></Provider>);
    const element = screen.getByText('Mock Movie');
    expect(element).toBeInTheDocument();
  });
});
