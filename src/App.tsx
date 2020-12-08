import React from 'react';
import './App.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './screens/Home/Home';
import Location from './screens/Location/Location';
import {Provider} from 'react-redux';
import store from './redux/store';
import {fetchAllEpisodes} from './redux/slices/episodeSlice';
import Error from './screens/Error/Error';

store.dispatch(fetchAllEpisodes());

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/location/:id" exact={true}>
            <Location />
          </Route>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="*" exact={true}>
            <Error />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
