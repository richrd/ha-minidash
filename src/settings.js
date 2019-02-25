
class Settings {
  constructor() {
    this.storageKey = "settings";
    this.settings = {};
    this.setDefaults();
  }

  setDefaults(defaults) {
    this.settings = { ...defaults };
  }

  getSettings() {
    return this.settings;
  }

  setSettings(settings) {
    this.settings = { ...settings };
  }

  load() {
    const data = window.localStorage.getItem(this.storageKey);
    if (data) {
      this.settings = JSON.parse(data);
    }
  }

  save() {
    window.localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
  }
}

const settings = new Settings();
settings.setDefaults();
export default settings;
