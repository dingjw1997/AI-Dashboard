import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Upload from './Upload';
import '@testing-library/jest-dom/extend-expect';

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
    expect(screen.getByText('Location')).toBeInTheDocument();
  });

  test('renders upload button', () => {
    expect(screen.getByRole('button', { name: 'Upload Files' })).toBeInTheDocument();
  });

  test('file input should be hidden', () => {
    const fileInput = screen.getByTestId('file-input');
    expect(fileInput).not.toBeVisible();
  });

  test('clicking the upload button triggers file input click', () => {

    // Mock function to simulate the file input click event
    const fileInputRef = {
      current: {
        click: jest.fn()
      }
    };

    // Button click simulation
    userEvent.click(screen.getByRole('button', { name: 'Upload Files' }));
    
    // The file input click should have been called
    expect(fileInputRef.current.click).toHaveBeenCalled();
  });

});
