import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

import entitiesReducer from './state/reducers/entities';
import connectionReducer from './state/reducers/connection';
import configReducer from './state/reducers/config';

import Root from './Root';


const history = createHistory();
console.log(history);
const middleware = routerMiddleware(history);
const store = createStore(
  combineReducers({
    entities: entitiesReducer,
    connection: connectionReducer,
    config: configReducer,
  }),
  applyMiddleware(middleware),
  applyMiddleware(ReduxThunk),
);

// Root rendering
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Root store={store} history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render();

if (module.hot) {
  module.hot.accept('./Root', render);
}
