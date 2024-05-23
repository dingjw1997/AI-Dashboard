import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './pages/Home/Home';
import Upload from './pages/Upload/Upload';
import Status from './pages/Status/Status';
import AssetDetail from './components/AssetDetail/AssetDetail';
import Map from './pages/Map/Map';

function App() {
  return (
    <Router>
      <div></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/status" element={<Status />} />
        <Route path="/details/:number" element={<AssetDetail />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;

