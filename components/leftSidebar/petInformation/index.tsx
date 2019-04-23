/** @jsx jsx */
import { Card, Elevation, FormGroup, InputGroup } from '@blueprintjs/core';
import { jsx } from '@emotion/core';
import React from 'react';
import {
  ageButtonWrapper,
  buttonLeftStyle,
  buttonRightStyle,
  sidebarContainerStyle
} from './style';

export interface IPetInformationProps {}

export default class PetInformation extends React.Component<
  IPetInformationProps,
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
