import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
// import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import App from './App';
import InfoView from './InfoView';
import GroupView from './GroupView';
import StateView from './StateView';


function Root({ history }) {
  const WrappedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={renderProps => (
        <App>
          <Component {...renderProps} />
        </App>
      )}
    />
  );

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <WrappedRoute path="/group/:groupId" component={GroupView} />
        <WrappedRoute path="/info" component={InfoView} />
        <WrappedRoute path="/debug" component={StateView} />
        <Redirect push from="/" to="/info" />
      </Switch>
    </ConnectedRouter>
  );
}


export default Root;
