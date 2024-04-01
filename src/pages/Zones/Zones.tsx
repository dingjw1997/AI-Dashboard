
import React, { useState } from 'react';
import './Zones.css';
import Header from '../../components/Header/Header';

function Zones() {
  const [buttonColors, setButtonColors] = useState(['#222222', '#222222', '#222222', '#222222', '#222222']);

  const handleButtonClick = (index: number) => {
    const newColors = buttonColors.map((color, i) => (i === index ? (color === '#222222' ? 'red' : '#222222') : '#222222'));
    setButtonColors(newColors);
  };

  return (
    <div>
      <div className="Header" data-testid="header-component">
        <Header />
      </div>
      <div className="App">
        <header className="App-header">
          <div className="button-container"> {/* Updated class name */}
            {/* Map over buttonColors array to create each button */}
            {buttonColors.map((color, index) => (
              <button
                key={index}
                className="top-button"
                style={{ backgroundColor: color }}
                onClick={() => handleButtonClick(index)}
              >
                ZONE {index + 1}
              </button>
            ))}
          </div>
          <p className="text-center" style={{ color: 'white' }}>TABLE OF DATA FOR ZONE</p>
        </header>
      </div>
    </div>
  );
}

export default Zones;
