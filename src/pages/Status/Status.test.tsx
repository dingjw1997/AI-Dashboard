import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Status from './Status'; 

describe('Status Component', () => {

  test('renders without crashing', () => {
    render(<Status />);
    expect(screen.getByText(/Status Readout/i)).toBeInTheDocument();
  });

  test('renders the line chart container', () => {
    render(<Status />);
    const lineChartContainer = screen.getByTestId('line-chart-container');
    expect(lineChartContainer).toBeInTheDocument();
  });

  test('renders the pie chart container', () => {
    render(<Status />);
    const pieChartContainer = screen.getByTestId('pie-chart-container');
    expect(pieChartContainer).toBeInTheDocument();
  });

});
