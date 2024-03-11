import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './pages/Home/Home';
import Alerts from './pages/Alerts/Alerts';
import DataIO from './pages/Data-IO/Data-IO';
import Status from './pages/Status/Status';
import Zones from './pages/Zones/Zones';

function App() {
  return (
    <Router>
      <div></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/data-io" element={<DataIO />} />
        <Route path="/status" element={<Status />} />
        <Route path="/zones" element={<Zones />} />
      </Routes>
    </Router>
  );
}

export default App;
