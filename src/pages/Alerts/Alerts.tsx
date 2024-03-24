//Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
//Reference: https://reactjs.org/docs/components-and-props.html
//test test 123
import React from 'react';
import styles from './Alerts.module.css';
import Header from '../../components/Header/Header';

function Alerts() {
  const zones = [
    { name: 'Zone 1', color: 'red' },
    { name: 'Zone 2', color: 'yellow' },
    { name: 'Zone 3', color: 'green' },
    { name: 'Zone 4', color: 'red' },
    { name: 'Zone 5', color: 'yellow' },
  ];

  const redZones = zones.filter(zone => zone.color === 'red');
  const yellowZones = zones.filter(zone => zone.color === 'yellow');
  const displayZones = redZones.length > 0 ? redZones : yellowZones;

  const [selectedZone, setSelectedZone] = useState('');

  return (
    <div>
      <div className="Header">
        <Header title="Alerts" activeLink="Alerts" />
      </div>
      <div className={styles.App}>
        <div className={styles.sidebar}>
          <select className={styles.dropdown} value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)}>
            <option value="">Select a zone</option>
            {displayZones.map(zone => (
              <option key={zone.name} value={zone.name} className={styles[zone.color]}>
                {zone.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.content}>
          {selectedZone ? (
            <h1>{selectedZone}</h1>
          ) : (
            <h1>No zones selected. Use the dropdown menu to select a zone.</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Alerts;






