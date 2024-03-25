import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './pages/Home/Home';
import Alerts from './pages/Alerts/Alerts';
import Upload from './pages/Upload/Upload';
import Status from './pages/Status/Status';
import Zones from './pages/Zones/Zones';
import Map from './pages/Map/Map';

function App() {
  return (
    <Router>
      <div></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/status" element={<Status />} />
        <Route path="/zones" element={<Zones />} />
        <Route path ="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;
