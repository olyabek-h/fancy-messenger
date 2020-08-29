import React, { useReducer } from 'react';
import Messenger from './pages/messenger';
import styles from './app.module.scss';
import { AppStateProvider } from './context/appStateContext'
import { DispatchProvider } from './context/dispatchContext'
import { INIT_STATE, reducer } from './stateManager/reducer'

function App() {
  const [state, dispatch] = useReducer(reducer, INIT_STATE)

  return (
    <div className={styles['app']}>
      <div className={styles['head']} />
      <div className={styles['main']}>
        <DispatchProvider dispatch={dispatch}>
          <AppStateProvider state={state}>
            <Messenger />
          </AppStateProvider>
        </DispatchProvider>
      </div>
    </div>
  );
}

export default App;