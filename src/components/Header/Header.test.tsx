import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header Component', () => {
  test('renders the dashboard title', () => {
    render(<Header />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  test('renders all navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Alerts')).toBeInTheDocument();
    expect(screen.getByText('Upload')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Map')).toBeInTheDocument();
  });

  test('opens dropdown menu on click', () => {
    render(<Header />);
    const alertsButton = screen.getByText('Alerts');
    fireEvent.click(alertsButton);
    expect(screen.getByText('Zone 1')).toBeInTheDocument();
    expect(screen.getByText('Zone 2')).toBeInTheDocument();
    expect(screen.getByText('Zone 3')).toBeInTheDocument();
    expect(screen.getByText('Zone 4')).toBeInTheDocument();
  });
});
