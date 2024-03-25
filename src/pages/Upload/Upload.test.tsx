import React from 'react';
import { render } from '@testing-library/react';
import Upload from './Upload';
import '@testing-library/jest-dom/extend-expect';

test('renders data correctly', () => {
  const { getByText } = render(<Upload />);
  
  // Check if the component renders the expected content
  expect(getByText('Status:')).toBeInTheDocument();
  expect(getByText('Type:')).toBeInTheDocument();
  expect(getByText('Location:')).toBeInTheDocument();
  expect(getByText('Last Serviced:')).toBeInTheDocument();
  
  // You can add more specific tests for the content if needed
});
