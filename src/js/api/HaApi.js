export class HaWebsocket {
  constructor(apiUrl, password = null, debug = false) {
    this.apiUrl = apiUrl;
    this.socket = null;
    this.reconnectTimeout = 1000;
    this.password = password;
    this.msgListeners = [];
    this.debug = debug;
    this.msgId = 1;
  }

  logToConsole(...args) {
    if (this.debug) {
      console.log(...args);
    }
  }

  async connect() {
    return new Promise((resolve, reject) => {
      const [apiProtocol, domain] = this.apiUrl.split('://');

      const wsProtocol = apiProtocol === 'https' ? 'wss' : 'ws';
      const wsUrl = `${wsProtocol}://${domain}/api/websocket`;

      this.logToConsole(`Connecting to websocket (${wsUrl})...`);

      this.socket = new WebSocket(wsUrl);
      this.socket.onopen = () => {
        this.logToConsole('Websocket is open');
        resolve();
      };

      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        this.logToConsole('%c Websocket message: %s %O', 'font-size:7px; color: #555', event.data, event);

        if (message.type) {
          if (message.type === 'auth_required') {
            this.authorize();
          } else if (message.type === 'auth_ok') {
            this.logToConsole('Authentication successfull!');
            this.subscribeToEvents();
          } else if (message.type === 'auth_invalid') {
            this.logToConsole('Authentication invalid!');
          }
        }

        this.relayToListeners(message);
      };

      this.socket.onerror = (event) => {
        console.error('API ERROR', event);
        reject(event);
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
    this.logToConsole('SENDING:', obj);
    obj.id = this.msgId;
    this.msgId = this.msgId + 1;
    this.socket.send(JSON.stringify(obj));
  }

  async subscribeToEvents() {
    this.send({
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
        type: 'UPDATE_ENTITY',
        data: {
          newState: message.event.data.new_state,
        },
      });
    }

    return null;
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


// Reload Core Config
export function reloadCoreConfig() {
  return (dispatch, getState) => {
    getState()
      .connection.get('websocket')
      .send({
        type: 'call_service',
        domain: 'homeassistant',
        service: 'reload_core_config',
        service_data: {},
      });
  };
}


// Reload Groups
export function reloadGroupConfig() {
  return (dispatch, getState) => {
    getState()
      .connection.get('websocket')
      .send({
        type: 'call_service',
        domain: 'group',
        service: 'reload',
        service_data: {},
      });
  };
}


// Reload Automation
export function reloadAutomationConfig() {
  return (dispatch, getState) => {
    getState()
      .connection.get('websocket')
      .send({
        type: 'call_service',
        domain: 'automation',
        service: 'reload',
        service_data: {},
      });
  };
}


export function toggleEntityState(entity) {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_ENTITY_STATE',
      data: entity,
    });

    const [domain] = entity.entity_id.split('.');

    getState()
      .connection.get('websocket')
      .send({
        type: 'call_service',
        domain,
        service: 'toggle',
        service_data: {
          entity_id: entity.entity_id,
        },
      });
  };
}


export function setSliderValue(entity, value) {
  return (dispatch, getState) => {
    const [domain] = entity.entity_id.split('.');

    getState()
      .connection.get('websocket')
      .send({
        type: 'call_service',
        domain,
        service: 'set_value',
        service_data: {
          value,
          entity_id: entity.entity_id,
        },
      });
  };
}
