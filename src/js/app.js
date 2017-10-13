import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class AppRoot extends Component {
  render() {
    return (
      <div>
        Well hi there! HA Dashboard is still being built, stay tuned!
      </div>
    );
  }
}

ReactDOM.render(<AppRoot />, document.getElementById('root'));
