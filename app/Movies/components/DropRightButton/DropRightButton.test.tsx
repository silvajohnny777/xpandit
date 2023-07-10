import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../GlobalRedux/store' 
import DropRightButton from './index';

describe('DropRightButton', () => {
  test('renders the Button component', () => {
    render(
      <Provider store={store}>
        <DropRightButton title="Button Title" APIAction="popular" />
      </Provider>
    );

    const button = screen.getByText('Button Title');
    expect(button).toBeInTheDocument();
  });

  test('shows years when button is clicked', () => {
    render(
      <Provider store={store}>
        <DropRightButton title="Button Title" APIAction="popular" />
      </Provider>
    );

    const button = screen.getByText('Button Title');
    fireEvent.click(button);

    const options = screen.getByText('Select a year');
    expect(options).toBeInTheDocument();
  });

  /*

  test('calls getMoviesByYear when a year is clicked', () => {
    const getMoviesByYear = jest.fn();
    render(
      <Provider store={store}>
        <DropRightButton title="Button Title" APIAction="popular" />
      </Provider>
    );

    const button = screen.getByText('Button Title');
    fireEvent.click(button);

    const year2023 = screen.getByText('2023');
    fireEvent.click(year2023);

    expect(getMoviesByYear).toHaveBeenCalledWith(2023);
  });
  */
});
