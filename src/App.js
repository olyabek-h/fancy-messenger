import React, { useReducer } from 'react';
import { AppStateProvider } from './context/appStateContext'
import { DispatchProvider } from './context/dispatchContext'
import { INIT_STATE, reducer } from './stateManager/reducer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ROUTES } from './routes/routes'
import MainLayout from './layout/mainLayout'
import Inaccessibility from './components/inaccessibility'

function App() {
  const [state, dispatch] = useReducer(reducer, INIT_STATE)
  const isAuthenticated = state.userId !== null;

  return (
    <DispatchProvider dispatch={dispatch}>
      <AppStateProvider state={state}>
        <BrowserRouter>
          <Switch>
            {ROUTES.map((item, index) => {
              if (item.private) {
                return (
                  <Route
                    key={index}
                    path={item.path}
                    render={() => (
                      <MainLayout
                        Component={isAuthenticated ? item.component : Inaccessibility}
                      />
                    )}
                  />
                )
              }
              else {
                return (
                  <Route
                    key={index}
                    path={item.path}
                    render={() => (
                      <MainLayout
                        Component={item.component}
                      />
                    )}

                  />
                )
              }
            }
            )}
          </Switch>
        </BrowserRouter>
      </AppStateProvider>
    </DispatchProvider>
  );
}

export default App;