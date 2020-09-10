import React, { useReducer, useEffect } from 'react';
import { AppStateProvider } from './context/appStateContext'
import { DispatchProvider } from './context/dispatchContext'
import { INIT_STATE, reducer } from './stateManager/reducer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ROUTES } from './routes/routes'
import MainLayout from './layout/mainLayout'
import SecondaryLayout from './layout/secondaryLayout'
import Inaccessibility from './pages/inaccessibility'
import { userSignedIn } from './stateManager/actionCreator'

function App() {
  const [state, dispatch] = useReducer(reducer, INIT_STATE)
  const isAuthenticated = state.userId !== null;

  useEffect(
    () => {
      if (localStorage.getItem('userId')) {
        const user = {
          id: localStorage.getItem('userId'),
          name: localStorage.getItem('username')
        }
        dispatch(userSignedIn(user));
      }
    }, []
  )

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
                        Component={isAuthenticated ?
                          item.component :
                          () => <SecondaryLayout Component={Inaccessibility} />
                        }
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
                        Component={() => <SecondaryLayout Component={item.component} />}
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