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


function setConnectionStatus(data) {
  return (dispatch) => {
    dispatch({
      type: 'SET_CONNECTION_STATUS',
      data,
    });
  };
}

export function tryConnect(url, password = null) {
  return async (dispatch) => {
    const reconnect = async () => {
      await dispatch(setConnectionStatus('disconnected'));
      await setTimeout(() => dispatch(tryConnect(url, password)), 1000);
    };

    // Connect to api with password
    const connection = new HaWebsocket(url, password);
    await dispatch(setConnectionStatus('connecting'));

    // Connect and automatic reconnect
    try {
      await connection.connect();
    } catch (err) {
      reconnect();
      return;
    }
    await dispatch(setConnectionStatus('connected'));

    connection.socket.onclose = () => reconnect();

    try {
      await dispatch(setWebsocket(connection, password));
      await dispatch(bootstrapLoaded(await getBootstrap(url, password)));
      await dispatch(configLoaded(await getConfig(url, password)));
      await dispatch(subscribeToAllEvents());
    } catch (e) {
      console.warn('Login failure', e);
      throw e;
    }
  };
}

