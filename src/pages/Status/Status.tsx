import React from 'react';
import Header from '../../components/Header/Header';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line, Pie } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

function LineGraph() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Demo Line Plot',
        data: [65, 59, 80, 81, 56],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return <Line data={data} />;
};

function PieChart() {
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'Demo Pie Chart',
        data: [300, 50, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
};

function Status() {
  return (
    <div>
      <Header title="Status Readout" activeLink="Status" />

      <div className="d-flex justify-content-around pt-5 border-bottom border-secondary-subtle">
        <div data-testid="line-chart-container" className="d-flex justify-content-center w-50" style={{height: '350px'}}>
          <LineGraph />
        </div>
        <div data-testid="pie-chart-container" className="d-flex justify-content-center w-25" style={{height: '350px'}}>
          <PieChart />
        </div>
      </div>
      <div className="d-flex justify-content-around pt-5">
        <div data-testid="line-chart-container" className="d-flex justify-content-center w-50" style={{height: '350px'}}>
          <LineGraph />
        </div>
        <div data-testid="pie-chart-container" className="d-flex justify-content-center w-25" style={{height: '350px'}}>
          <PieChart />
        </div>
      </div>
    </div>
  );
}


export default Status;

