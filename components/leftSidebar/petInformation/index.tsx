/** @jsx jsx */
import {
  Card,
  Elevation,
  FormGroup,
  H4,
  InputGroup,
  TextArea
} from '@blueprintjs/core';
import { jsx } from '@emotion/core';
import React from 'react';
import {
  ageButtonWrapper,
  buttonLeftStyle,
  buttonRightStyle,
  sidebarContainerStyle,
  wid
} from './style';

export interface IPetInformationProps {}

export default class PetInformation extends React.Component<
  IPetInformationProps,
  any
> {
  render() {
    return (
      <Card elevation={Elevation.ONE} css={sidebarContainerStyle}>
        <H4>Información</H4>
        <div>
          <FormGroup label='Nombre'>
            <InputGroup placeholder='Nombre' intent='primary' />
          </FormGroup>
        </div>
        <div>
          <FormGroup label='Edad'>
            <div css={ageButtonWrapper}>
              <InputGroup placeholder='Años' css={buttonLeftStyle} />
              <InputGroup placeholder='Meses' css={buttonRightStyle} />
            </div>
          </FormGroup>
        </div>
        <div>
          <FormGroup label='Raza'>
            <InputGroup name='Raza' placeholder='Raza' />
          </FormGroup>
        </div>
        <div>
          <FormGroup label='Información Extra'>
            <TextArea
              fill={true}
              growVertically={true}
              name='Extra'
              placeholder='Extra'
            />
          </FormGroup>
        </div>
      </Card>
    );
  }
}
