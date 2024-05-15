import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Upload from './Upload';
import '@testing-library/jest-dom/extend-expect';

// Mock firebase to prevent actual initialisation
jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn(),
}));

// Mock firebase database to prevent actual calls
jest.mock('firebase/compat/database', () => ({
  database: jest.fn(),
}));

// Mock navigate function used in the component
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // import and retain the original functionalities
  useNavigate: () => jest.fn(), // mock useNavigate with an empty function
}));

describe('Upload Component', () => {

  test('renders all address input fields correctly', () => {
    render(<Upload />);
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Street')).toBeInTheDocument();
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('State')).toBeInTheDocument();
    expect(screen.getByLabelText('Postcode')).toBeInTheDocument();
  });

  test('renders location heading', () => {
    render(<Upload />);
    expect(screen.getByText('Location')).toBeInTheDocument();
  });

  test('renders asset information heading', () => {
    render(<Upload />);
    expect(screen.getByText('Asset Information')).toBeInTheDocument();
  });

  test('renders upload button', () => {
    render(<Upload />);
    expect(screen.getByRole('button', { name: 'Upload Files' })).toBeInTheDocument();
  });

});
