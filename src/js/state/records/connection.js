
import { Record } from 'immutable';

const ConnectionState = Record({
  authorized: false,
  connected: false,
  loginFailed: false,
  password: '',
  websocket: null,
});

export { ConnectionState };
