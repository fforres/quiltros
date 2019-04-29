/** @jsx jsx */
import { Button } from '@blueprintjs/core';
import { jsx } from '@emotion/core';
import React from 'react';
import { trackErrorSentry } from '../../../lib/error_handling';
import { sidebarContainerStyle } from './style';

class SubmitButton extends React.Component {
  render() {
    return (
      <div css={sidebarContainerStyle}>
        <Button type='submit' intent='none' rightIcon='floppy-disk'>
          Crear Imagen
        </Button>
      </div>
    );
  }
}

export default SubmitButton;
