class HaApi {
  constructor() {
    this.apiUrl = null;
    this.password = null;
    this.debug = false;
    this.socket = null;

    this.shouldReconnect = false;
    this.reconnectTimeout = null;
    this.reconnectDelay = 1000; // TODO: fixme

    this.msgId = 1;
    this.eventCallback = null;
    this.resultCallback = null;
    // Mapping of message id to message type for pending requests
    this.pendingRequests = [];
  }

  setDebug(debug) {
    this.debug = debug;
  }

  debugLog(...args) {
    if (this.debug) {
      console.log("HaApi:", ...args);
    }
  }

  connect() {
    this.debugLog("CONNECT");

    const [apiProtocol, domain] = this.apiUrl.split("://");
    const wsProtocol = apiProtocol === "https" ? "wss" : "ws";
    const wsUrl = `${wsProtocol}://${domain}/api/websocket`;

    this.triggerEvent("connection_status", "connecting");
    this.socket = new WebSocket(wsUrl);


    this.socket.onopen = () => {
      this.debugLog("ONOPEN");
      this.shouldReconnect = true;
      this.triggerEvent("connection_status", "connected");
    };

    this.socket.onclose = () => {
      this.debugLog("ONCLOSE");
      this.triggerEvent("connection_status", "disconnected");
      this.reconnect();
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.debugLog("RECEIVED:", message);

      if (message.type) {
        if (message.type === "auth_required") {
          this.authorize();
        } else if (message.type === "auth_ok") {
          this.debugLog("Authentication successfull!");
          this.triggerEvent("auth_ok");
          this.subscribeToEvents();
        } else if (message.type === "auth_invalid") {
          this.debugLog("Authentication failed!");
          this.triggerEvent("auth_invalid");
        } else if (message.type === "result") {
          this.handleResult(message);
        } else if (message.type === "event") {
          this.triggerEvent("event", message);
        }
      }
    };

    this.socket.onerror = (event) => {
      this.debugLog("ONERROR", event);
      this.shouldReconnect = true;
      this.triggerEvent("connection_status", "disconnected");
      this.reconnect();
    };
  }

  reconnect() {
    if (this.shouldReconnect) {
      this.debugLog("RECONNECT");
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = setTimeout(() => {
        try {
          this.connect();
        } catch (e) {
          this.debugLog("Reconnecting failed...");
        }
      }, this.reconnectDelay);
    }
  }

  disconnect() {
    this.debugLog("DISCONNECT");
    clearTimeout(this.reconnectTimeout);
    this.shouldReconnect = false;
    if (this.socket) {
      this.socket.close();
    }
  }

  send(obj, sendId = true) {
    let messageId = null;
    if (sendId) {
      messageId = this.msgId;
      obj.id = this.msgId;
    }
    try {
      this.socket.send(JSON.stringify(obj));
      this.debugLog("SENT:", obj);
    } catch (e) {
      console.warn("Unable to send  to socket!", e);
    }

    this.msgId = this.msgId + 1;
    return messageId;
  }

  authorize() {
    this.send(
      {
        type: "auth",
        api_password: this.password,
      },
      false
    );
  }

  handleResult(message) {
    // When a result comes in, get its type and forward it
    const resultType = this.pendingRequests[message.id];
    if (resultType) {
      this.triggerResult(resultType, message.result);
      delete this.pendingRequests[message.id];
    }
  }

  subscribeToEvents() {
    this.send({
      type: "subscribe_events",
    });
  }

  triggerEvent(type, data) {
    if (!this.eventCallback) {
      return;
    }
    this.eventCallback(type, data);
  }

  triggerResult(type, data) {
    if (!this.resultCallback) {
      return;
    }
    this.resultCallback(type, data);
  }

  /** ************************************************************************ */

  init(apiUrl, password = null, debug = false) {
    this.apiUrl = apiUrl;
    this.password = password;
    this.debug = debug;
  }

  onEvent(eventCallback) {
    this.eventCallback = eventCallback;
  }

  onResult(resultCallback) {
    this.resultCallback = resultCallback;
  }

  makeRequest(type) {
    const id = this.send({
      type,
    });
    this.pendingRequests[id] = type;
  }

  toggleEntity(entity) {
    this.send({
      type: "call_service",
      domain: "homeassistant",
      service: "toggle",
      service_data: {
        entity_id: entity.entity_id,
      },
    });
  }

  runEntityScript(entity) {
    const [domain] = entity.entity_id.split(".");
    this.send({
      type: "call_service",
      domain,
      service: "turn_on",
      service_data: {
        entity_id: entity.entity_id,
      },
    });
  }

  // Reload Core Config
  reloadCoreConfig() {
    this.send({
      type: "call_service",
      domain: "homeassistant",
      service: "reload_core_config",
    });
  }

  // Reload Groups
  reloadGroupConfig() {
    this.send({
      type: "call_service",
      domain: "group",
      service: "reload",
    });
  }

  reloadAutomationConfig() {
    this.send({
      type: "call_service",
      domain: "automation",
      service: "reload",
    });
  }

  restartHomeAssistant() {
    this.send({
      type: "call_service",
      domain: "homeassistant",
      service: "restart",
    });
  }
}

const haApi = new HaApi();
export default haApi;
