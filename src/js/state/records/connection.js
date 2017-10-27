
import { Record } from 'immutable';

const ConnectionState = Record({
  authorized: false,
  status: 'disconnected',
  loginFailed: false,
  password: '',
  websocket: null,
});

export { ConnectionState };
