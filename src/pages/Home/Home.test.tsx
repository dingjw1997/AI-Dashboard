import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import '@testing-library/jest-dom';

describe('Home component tests', () => {

  it('should render the header', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const headerText = screen.getByText(/dashboard/i);
    expect(headerText).toBeInTheDocument();
  });

  it('should display the Alerts section with correct links', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const alertsHeadings = screen.getAllByText('Alerts');
    const alertsHeading = alertsHeadings.find(heading => heading.tagName === 'H4');
    expect(alertsHeading).toBeInTheDocument();

    // Check links are rendered and clickable
    const zone1Link = screen.getByRole('link', { name: 'Zone 1' });
    expect(zone1Link).toHaveAttribute('href', '/zone/1');

    const zone2Link = screen.getByRole('link', { name: 'Zone 2' });
    expect(zone2Link).toHaveAttribute('href', '/zone/2');

    const zone3Link = screen.getByRole('link', { name: 'Zone 3' });
    expect(zone3Link).toHaveAttribute('href', '/zone/3');

    const zone4Link = screen.getByRole('link', { name: 'Zone 4' });
    expect(zone4Link).toHaveAttribute('href', '/zone/4');
  });

  it('should display the Status section with a BasicTable', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const statusHeadings = screen.getAllByText('Status');
    const statusHeading = statusHeadings.find(heading => heading.tagName === 'H4');
    expect(statusHeading).toBeInTheDocument();
    
    // Ensure BasicTable is rendered
    expect(screen.getByText('Asset')).toBeInTheDocument();
    expect(screen.getByText('No.')).toBeInTheDocument();
    expect(screen.getByText('Condition')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
  });

  it('should display the Map section correctly', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    const mapHeadings = screen.getAllByText('Map');
    const mapHeading = mapHeadings.find(heading => heading.tagName === 'H4');
    expect(mapHeading).toBeInTheDocument();

  });
});
