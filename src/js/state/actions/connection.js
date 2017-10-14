import { List } from 'immutable';

import { HaWebsocket, getBootstrap, getConfig, subscribeToAllEvents } from '../../api/HaApi';


export function setWebsocket(websocket, password) {
  return {
    type: 'LOGIN_SUCCESS',
    data: { websocket, password },
  };
}

function bootstrapLoaded(data) {
  return (dispatch) => {
    dispatch({
      type: 'SET_ENTITIES',
      data: List(data.states),
    });
  };
}

function configLoaded(data) {
  return (dispatch) => {
    dispatch({
      type: 'SET_CONFIG',
      data,
    });
  };
}

export function tryConnect(url, password = null) {
  return async (dispatch) => {

    // dispatch(loginRequest());

    // Connect to api with password
    const connection = new HaWebsocket(url, password);
    await connection.connect();

    // connection.onclose(() => dispatch(connectionClosed()));

    try {
      // await connection.authorize(password);
      await dispatch(setWebsocket(connection, password));
      await dispatch(bootstrapLoaded(await getBootstrap(url, password)));
      await dispatch(configLoaded(await getConfig(url, password)));
      await dispatch(subscribeToAllEvents());
    } catch (e) {
      console.warn('Login failure', e);
      // dispatch(connectFailed());
      throw e;
    }
  };
}

