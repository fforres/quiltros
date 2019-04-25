/** @jsx jsx */
import {
  Card,
  Elevation,
  FormGroup,
  H4,
  InputGroup,
  Radio,
  RadioGroup,
  Switch,
  TextArea
} from '@blueprintjs/core';
import { jsx } from '@emotion/core';
import React from 'react';
import { sidebarContainerStyle } from './style';

export interface IPetInformationProps {}

export default class PetInformation extends React.Component<
  IPetInformationProps,
  any
> {
  state = {
    size: ''
  };

  onRadioGroupChanged = e => this.setState({ size: e.currentTarget.value });

  render() {
    const { size } = this.state;
    return (
      <Card elevation={Elevation.ONE} css={sidebarContainerStyle}>
        <H4>Información</H4>
        <div>
          <FormGroup label='Nombre *'>
            <InputGroup placeholder='Nombre' intent='primary' required={true} />
          </FormGroup>
        </div>
        <div>
          <FormGroup>
            <Switch
              label='Esterilizado'
              innerLabel='No'
              inline={true}
              innerLabelChecked='Si'
            />
            <Switch
              label='Chip'
              innerLabel='No'
              inline={true}
              innerLabelChecked='Si'
            />
            <Switch
              label='Vacunas al día'
              innerLabel='No'
              inline={true}
              innerLabelChecked='Si'
            />
          </FormGroup>
        </div>
        <div>
          <RadioGroup
            onChange={this.onRadioGroupChanged}
            label='Tamaño *'
            name='size'
            selectedValue={size}
          >
            <Radio label='Pequeño' value='s' />
            <Radio label='Mediano' value='m' />
            <Radio label='Grande' value='l' />
          </RadioGroup>
        </div>
        <div>
          <FormGroup label='Edad'>
            <InputGroup placeholder='Años' />
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
