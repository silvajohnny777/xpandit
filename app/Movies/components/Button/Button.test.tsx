import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Button from './index';
import { store } from '../../../GlobalRedux/store'
import '@testing-library/jest-dom'


test('renders button component', () => {

  const { getByText } = render(
    <Provider store={store}>
      <Button title="Button" APIAction="action" />
    </Provider>
  );
  
  expect(getByText('Button')).toBeInTheDocument();
});
