import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import Zones from './Zones';


test('renders Zones component', () => {
  render(<Zones />);
  
  // Check if the Header component is rendered
  const headerElement = screen.getByTestId('header-component');
  expect(headerElement).toBeInTheDocument();

  // Check if each button is rendered with the correct text
  for (let i = 1; i <= 5; i++) {
    const zoneButton = screen.getByText(`ZONE ${i}`);
    expect(zoneButton).toBeInTheDocument();
  }

  // Check if each button initially has the correct background color
  for (let i = 1; i <= 5; i++) {
    const zoneButton = screen.getByText(`ZONE ${i}`);
    expect(zoneButton).toHaveStyle({ backgroundColor: '#222222' });
  }

  // Click on each button and check if the background color changes
  for (let i = 0; i < 5; i++) {
    const zoneButton = screen.getByText(`ZONE ${i + 1}`);
    fireEvent.click(zoneButton);
    expect(zoneButton).toHaveStyle({ backgroundColor: 'red' });
    fireEvent.click(zoneButton); // Click again to revert the color
    expect(zoneButton).toHaveStyle({ backgroundColor: '#222222' });
  }

  // Check if the text "TABLE OF DATA FOR ZONE" is rendered
  const tableTextElement = screen.getByText(/TABLE OF DATA FOR ZONE/i);
  expect(tableTextElement).toBeInTheDocument();
});
