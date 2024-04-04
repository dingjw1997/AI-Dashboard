import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';

test('renders Home component', () => {
  render(<Home />);

  // Check if the component renders
  const homeComponent = screen.getByTestId('home-component');
  expect(homeComponent).toBeInTheDocument();

  // Check if the header is rendered with the correct text
  const headerElement = screen.getByText('AI Dashboard');
  expect(headerElement).toBeInTheDocument();

  // Check if the Alerts section is rendered with the correct links
  const alertsElement = screen.getByText('Alerts');
  expect(alertsElement).toBeInTheDocument();
  expect(screen.getByText('Zone 1')).toBeInTheDocument();
  expect(screen.getByText('Zone 2')).toBeInTheDocument();
  expect(screen.getByText('Zone 3')).toBeInTheDocument();
  expect(screen.getByText('Zone 4')).toBeInTheDocument();

  // Check if the Status section is renderedw
  const statusElement = screen.getByText('Status');
  expect(statusElement).toBeInTheDocument();

  // Check if the Map section is rendered with the correct text
  const mapElement = screen.getByText('Map');
  expect(mapElement).toBeInTheDocument();
  expect(screen.getByTestId('interactive-map')).toBeInTheDocument();
});
