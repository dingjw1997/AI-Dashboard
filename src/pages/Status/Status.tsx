import React from 'react';
import Header from '../../components/Header/Header';
import BasicTable from '../../components/BasicTable/BasicTable';

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// import { Line, Pie } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

function Status() {

  // const lineData1 = {
  //   labels: ['January', 'February', 'March', 'April', 'May'],
  //   datasets: [{
  //     label: 'Demo Line Plot',
  //     data: [65, 59, 80, 81, 56],
  //     fill: false,
  //     backgroundColor: 'rgb(75, 192, 192)',
  //     borderColor: 'rgba(75, 192, 192, 0.2)',
  //   }],
  // };


  // const pieData1 = {
  //   labels: ['Red', 'Blue', 'Yellow'],
  //   datasets: [{
  //     label: 'Demo Pie Chart',
  //     data: [300, 50, 100],
  //     backgroundColor: [
  //       'rgba(255, 99, 132, 0.2)',
  //       'rgba(54, 162, 235, 0.2)',
  //       'rgba(255, 206, 86, 0.2)',
  //     ],
  //     borderColor: [
  //       'rgba(255, 99, 132, 1)',
  //       'rgba(54, 162, 235, 1)',
  //       'rgba(255, 206, 86, 1)',
  //     ],
  //     borderWidth: 1,
  //   }],
  // };


  // const lineData2 = {
  //   labels: ['June', 'July', 'August', 'September', 'October'],
  //   datasets: [{
  //     label: 'Second Line Plot',
  //     data: [70, 45, 65, 75, 85],
  //     fill: true,
  //     backgroundColor: 'rgb(255, 99, 132)',
  //     borderColor: 'rgba(255, 99, 132, 0.2)',
  //   }],
  // };


  // const pieData2 = {
  //   labels: ['Green', 'Purple', 'Orange'],
  //   datasets: [{
  //     label: 'Second Pie Chart',
  //     data: [120, 150, 90],
  //     backgroundColor: [
  //       'rgba(75, 192, 192, 0.2)',
  //       'rgba(153, 102, 255, 0.2)',
  //       'rgba(255, 159, 64, 0.2)',
  //     ],
  //     borderColor: [
  //       'rgba(75, 192, 192, 1)',
  //       'rgba(153, 102, 255, 1)',
  //       'rgba(255, 159, 64, 1)',
  //     ],
  //     borderWidth: 1,
  //   }],
  // };

  return (
    <div>
      <Header />
      <BasicTable />

      {/* <div className="d-flex justify-content-around pt-5">
        <div className="d-flex justify-content-center w-50" style={{height: '400px'}}>
          <Line data={lineData1} />
        </div>
        <div className="d-flex justify-content-center w-25" style={{height: '400px'}}>
          <Pie data={pieData1} />
        </div>
      </div>

      <div className="d-flex justify-content-around pt-5">
        <div className="d-flex justify-content-center w-50" style={{height: '400px'}}>
          <Line data={lineData2} />
        </div>
        <div className="d-flex justify-content-center w-25" style={{height: '400px'}}>
          <Pie data={pieData2} />
        </div>
      </div> */}
    </div> 
  );
}

export default Status;
