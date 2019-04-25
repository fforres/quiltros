/** @jsx jsx */
import { Button } from '@blueprintjs/core';
import { jsx } from '@emotion/core';
import React from 'react';
import { sidebarContainerStyle } from './style';

export default class SubmitButton extends React.Component {
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
