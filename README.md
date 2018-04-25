# HA Minidash :control_knobs:

         __    __ _________      _______________   ___________    _____________________   ___
        /  /  /  /  __    /\    /        /  /   | /  /  /  _  \  /  __    /  ______/  /  /  /\
       /  /__/  /  /__/  / /   /  /  /  /  /    |/  /  /  / \  \/  /__/  /  /_____/  /__/  / /
      /  __    /  ___   / /   /  /  /  /  /  /|    /  /  /  /  /  __    /_____   /  __    / /
     /  /  /  /  /  /  / /   /  /  /  /  /  / |   /  /  /__/  /  /  /  /_____/  /  /  /  / /
    /__/  /  /__/  /__/ /   /__/__/__/__/__/ /|__/__/________/__/  /__/________/__/  /__/ /
    \__\/ \__\__\/ \__\/    \__\__\__\__\__\/ \__\__\________\__\/ \__\________\__\/ \__\/

                               The simplest UI for HomeAssistant


HA Minidash is a simple mobile friendly dashboard for Home Assistant that uses your
existing Home Assistant configuration. 

http://github.com/richrd/ha-minidash

## Features
 * Almost no required configuration: only the API url (and password) is necessary
 * The only requirement is a webserver (any http server will work)
 * Different entities are shown correctly depending on their type
   * Switches and boolean inputs are shown with their correct icon and toggled by clicking them
   * Binary sensors are shown with an icon and are colored if the sensor is on
   * Sensors are shown with the value and unit and if the unit is a percentage a radial progress bar is shown
   * Number inputs are shown as interactive sliders
   * Text inputs are shown as an editable textarea
 * Tiles are automatically packed into a grid
 * Navigation shows all non-hidden groups with correct icon and name
 * Automatic connecting and reconnecting to the HomeAssistant websocket
 * Built with React and Redux


## Configuration

The configuration is simply stored in `config.js` to make it easy to edit.
A minimal configuration looks like this:

```
window.config = {
  apiUrl: 'http://hassbian:8123',  // The address and port of your HA instance.
  password: '',                    // The HA password. Leave empty if you don't use a password.
};
```

If you want to explicitly specify which groups to show, and in what order you can add `groups` configuration:

```
window.config = {
  apiUrl: 'http://hassbian:8123',
  password: '',
  groups: [
    'dashboard',
    'alarm',
    'presence',
    'system',
    'testing',
  ],
};
```


## Installation

HA Minidash doesn't need to be separately installed. Just copy the contents of the `dist` directory
to a director that is served by your HTTP server and add the `config.js` file to that folder.

## Developing

First install the project packages:
```
npm install
```

In the public folder copy `config.example.js` to `config.js` and edit how you wish.

After this you can run the app in developement mode with live reloading:
```
npm run dev
```

To make a production build run the following command (the build will be created in the `dist` folder):
```
npm run build
```

