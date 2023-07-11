import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MoviesTable from './index';
import { Provider } from 'react-redux';
import { store } from '../../../GlobalRedux/store' 
import '@testing-library/jest-dom'
import axios from 'axios';

jest.mock('axios')

describe('MoviesItem', () => {

  test('renders moviesTable component with no data', () => {
    render(<Provider store={store}><MoviesTable /></Provider>);
    const element = screen.getByText('No movies were found!');
    expect(element).toBeInTheDocument();
  });
  
  test('Some test', async() => {
    (axios.get as jest.Mock).mockResolvedValue({
        results: [{
            title: 'Avatar'
        }]
    })

    render(<Provider store={store}><MoviesTable /></Provider>)
  
    await waitFor(() => {
      screen.findByText('Avatar');
    });
  });

});
