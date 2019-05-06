import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const portalRoot = document.getElementById('portal_container');

class Notification extends Component<any, any> {
  render() {
    if (!portalRoot) {
      return;
    }
    return ReactDOM.createPortal(this.props.children, portalRoot);
  }
}

export default Notification;
