import { createReducer } from '../../utilities';
import { ConnectionState } from '../records/connection';


export default createReducer(new ConnectionState(), {

  LOGIN_SUCCESS: (state, { websocket, password }) =>
    state.set('authorized', true)
      .set('websocket', websocket)
      .set('password', password),


  LOGIN_FAILED: state => state.set('loginFailed', true),


  CONNECTION_CLOSED: (state) => {
    console.log('Connection closed.', state);
  },


  SUBSCRIBE_TO_EVENTS: (state, { callback }) => {
    state.get('websocket').addMessageListener(callback);
    return state;
  },

});
