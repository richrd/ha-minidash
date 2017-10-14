export class HaWebsocket {
  constructor(apiUrl, password = null) {
    this.apiUrl = apiUrl;
    this.socket = null;
    this.reconnectTimeout = 1000;
    this.password = password;
    this.msgListeners = [];
  }

  async connect() {
    return new Promise((resolve, reject) => {
      const [apiProtocol, domain] = this.apiUrl.split('://');

      const wsProtocol = apiProtocol === 'https' ? 'wss' : 'ws';
      const wsUrl = `${wsProtocol}://${domain}/api/websocket`;

      console.log(`Connecting to websocket (${wsUrl})...`);

      this.socket = new WebSocket(wsUrl);
      this.socket.onopen = () => {
        console.log('Websocket is open');
        resolve();
      };

      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('%c Websocket message: %s %O', 'font-size:7px; color: #555', event.data, event );

        if (message.type) {
          if (message.type === 'auth_required') {
            this.authorize();
          } else if (message.type === 'auth_ok') {
            console.log('Authentication successfull!');
            this.subscribeToEvents();
          } else if (message.type === 'auth_invalid') {
            console.log('Authentication invalid!');
          }
        }

        this.relayToListeners(message);
      };

      this.socket.onerror = (event) => {
        console.error('API ERROR', event);
      };
    });
  }

  async authorize() {
    if (!this.password) {
      console.error('API needs authorization but no password provided!');
      return;
    }
    this.send({
      type: 'auth',
      api_password: this.password,
    });
  }

  async send(obj) {
    this.socket.send(JSON.stringify(obj));
  }

  async subscribeToEvents() {
    this.send({
      id: 1,
      type: 'subscribe_events',
    });
  }

  relayToListeners(message) {
    this.msgListeners.forEach(cb => cb(message));
  }

  addMessageListener(callback) {
    this.msgListeners.push(callback);
  }
}


function handleEventSubscription(dispatch) {
  return function (message) {
    const type = message.event && message.event.event_type;

    if (type === 'state_changed' && message.event.data.new_state) {
      return dispatch({
        type: 'UPDATE_ENTITY_STATE',
        data: {
          newState: message.event.data.new_state,
        },
      });
    }
  };
}


export function subscribeToAllEvents() {
  return dispatch => dispatch({
    type: 'SUBSCRIBE_TO_EVENTS',
    data: {
      message: { type: 'subscribe_events' },
      callback: handleEventSubscription(dispatch),
    },
  });
}


export function getBootstrap(url, password) {
  return fetch(`${url}/api/bootstrap?api_password=${password}`)
    .then(res => res.json())
    .catch(err => console.log(err));
}


export function getConfig(url, password) {
  return fetch(`${url}/api/config?api_password=${password}`)
    .then(res => res.json())
    .catch(err => console.log(err));
}
