import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import BasicTable from './BasicTable';
import { BrowserRouter } from 'react-router-dom';

describe('BasicTable', () => {
  const setup = () => render(
    <BrowserRouter>
      <BasicTable />
    </BrowserRouter>
  );

  test('renders BasicTable and checks for the correct number of rows', () => {
    setup();
    // Check for the correct number of rows, excluding the header and the empty rows
    const tableRows = screen.getAllByRole('row');
    // Update this number based on the actual non-empty rows + header
    expect(tableRows).toHaveLength(17); // 16 data rows + 1 header row
  });

  test('ensures table headers are correct', () => {
    setup();
    const headers = ['Asset', 'No.', 'Condition', 'Location', 'Material', 'Last Inspection Date'];
    headers.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test('verifies table content for accuracy', () => {
    setup();
    // Verifying content of the first data row
    const firstDataRow = screen.getAllByRole('row')[1]; // Adjust based on table data
    // Verify that the first row's data matches what is expected
    expect(within(firstDataRow).getByText('Matagarup Bridge')).toBeInTheDocument();
    expect(within(firstDataRow).getByText('101')).toBeInTheDocument();
    expect(within(firstDataRow).getByText('Good')).toBeInTheDocument();
    expect(within(firstDataRow).getByText('East Perth')).toBeInTheDocument();
    expect(within(firstDataRow).getByText('Steel')).toBeInTheDocument();
    expect(within(firstDataRow).getByText('2023-08-15')).toBeInTheDocument();
  });
});
