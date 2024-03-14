//Reference: https://testing-library.com/docs/react-testing-library/intro/
//Reference: https://github.com/testing-library/jest-dom

import React from 'react';
import { render, screen } from '@testing-library/react';
import Alerts from './Alerts';
import '@testing-library/jest-dom/extend-expect';


test('renders Alerts component', () => {
  render(<Alerts />);
  
  const zone1Element = screen.getByText(/Zone 1/i);
  expect(zone1Element).toBeInTheDocument();

  const zone2Element = screen.getByText(/Zone 2/i);
  expect(zone2Element).toBeInTheDocument();

  const zone3Element = screen.getByText(/Zone 3/i);
  expect(zone3Element).toBeInTheDocument();

  const zone4Element = screen.getByText(/Zone 4/i);
  expect(zone4Element).toBeInTheDocument();

  const zone5Element = screen.getByText(/Zone 5/i);
  expect(zone5Element).toBeInTheDocument();

  const alertsElement = screen.getByRole('heading', { name: 'Alerts' });
  expect(alertsElement).toBeInTheDocument();
});
