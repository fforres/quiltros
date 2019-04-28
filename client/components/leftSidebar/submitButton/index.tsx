/** @jsx jsx */
import { Button } from '@blueprintjs/core';
import { jsx } from '@emotion/core';
import React from 'react';
import { trackErrorSentry } from '../../../lib/error_handling';
import { sidebarContainerStyle } from './style';

export default class SubmitButton extends React.Component {
  onClick = () => {
    trackErrorSentry(new Error('Test!'));
  };
  render() {
    return (
      <div css={sidebarContainerStyle}>
        <Button type='submit' intent='none' rightIcon='floppy-disk'>
          Crear Imagen
        </Button>
        <Button intent='danger' rightIcon='floppy-disk' onClick={this.onClick}>
          Error
        </Button>
      </div>
    );
  }
}
