import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import entitiesReducer from './state/reducers/entities';
import connectionReducer from './state/reducers/connection';
import configReducer from './state/reducers/config';

import App from './App';


const store = createStore(
  combineReducers({
    entities: entitiesReducer,
    connection: connectionReducer,
    config: configReducer,
  }),
  applyMiddleware(ReduxThunk),
);

// Root rendering
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render();

if (module.hot) {
  module.hot.accept('./App', render);
}
