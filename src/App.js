import React from 'react';
import Messenger from './pages/messenger';
import styles from './app.module.scss';

function App() {

  return (
    <div className={styles['app']}>
      <div className={styles['head']} />
      <div className={styles['main']}>
        <Messenger />
      </div>
    </div>
  );
}

export default App;