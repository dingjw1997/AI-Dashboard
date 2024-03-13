//Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
//Reference: https://reactjs.org/docs/components-and-props.html

import React from 'react';
import styles from './Alerts.module.css';

function Alerts() {
  return (
    <div className={styles.App}>
      <div className={styles.sidebar}>
        <div className={`${styles.tab} ${styles.red}`}><span className={styles.bold}>Zone 1</span></div>
        <div className={`${styles.tab} ${styles.yellow}`}><span className={styles.bold}>Zone 2</span></div>
        <div className={`${styles.tab} ${styles.green}`}><span className={styles.bold}>Zone 3</span></div>
        <div className={`${styles.tab} ${styles.red}`}><span className={styles.bold}>Zone 4</span></div>
        <div className={`${styles.tab} ${styles.yellow}`}><span className={styles.bold}>Zone 5</span></div>
      </div>
      <div className={styles.content}>
        <h1>Alerts</h1>
      </div>
    </div>
  );
}

export default Alerts;
