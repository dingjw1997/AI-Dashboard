import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Status from './Status'; 
import { BrowserRouter } from 'react-router-dom';

describe('Status Component', () => {
  // Helper function to render the component within the Router since components use routing
  const renderComponent = () => render(
    <BrowserRouter>
      <Status />
    </BrowserRouter>
  );

  test('renders the Header component', () => {
    renderComponent();

    // For the Header component, check for the presence of the "Dashboard" text,
    // which is part of the Header component.
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('renders the BasicTable component', () => {
    renderComponent();

    // For the BasicTable component, check for a specific table header to ensure it's rendered.
    expect(screen.getByText('Asset')).toBeInTheDocument();
    expect(screen.getByText('No.')).toBeInTheDocument();
    expect(screen.getByText('Condition')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Material')).toBeInTheDocument();
    expect(screen.getByText('Last Inspection Date')).toBeInTheDocument();
  });

});
