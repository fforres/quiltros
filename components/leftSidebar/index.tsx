/** @jsx jsx */
import {
  Card,
  Elevation,
  FormGroup,
  H5,
  InputGroup,
  Label,
  NumericInput,
  Pre
} from '@blueprintjs/core';
import { jsx } from '@emotion/core';
import React from 'react';
import {
  ageButtonWrapper,
  buttonLeftStyle,
  buttonRightStyle,
  sidebarContainerStyle
} from './style';

export interface ILeftSidebarProps {}

export default class LeftSidebar extends React.Component<
  ILeftSidebarProps,
  any
> {
  render() {
    return (
      <Card elevation={Elevation.ONE} css={sidebarContainerStyle}>
        <div>
          <FormGroup label='Nombre'>
            <InputGroup placeholder='Nombre' intent='primary' />
          </FormGroup>
        </div>
        <div>
          <FormGroup label='Edad'>
            <div css={ageButtonWrapper}>
              <InputGroup
                placeholder='Años'
                intent='primary'
                css={buttonLeftStyle}
              />
              <InputGroup
                placeholder='Meses'
                intent='primary'
                css={buttonRightStyle}
              />
            </div>
          </FormGroup>
        </div>
      </Card>
    );
  }
}
