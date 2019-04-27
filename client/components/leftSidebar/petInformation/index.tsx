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
import React, { FormEvent } from 'react';
import { fakeRadioGroupStyle, sidebarContainerStyle } from './style';

export interface IPetInformationProps {}

export default class PetInformation extends React.Component<
  IPetInformationProps,
  any
> {
  state = {
    size: undefined
  };

  onRadioGroupChanged = (e: FormEvent<HTMLInputElement>) =>
    this.setState({ size: e.currentTarget.value });

  render() {
    const { size } = this.state;
    return (
      <Card elevation={Elevation.ONE} css={sidebarContainerStyle}>
        <H4>Información</H4>
        <div>
          <FormGroup label='Nombre *'>
            <InputGroup
              name='nombre-mascota'
              placeholder='Nombre'
              intent='primary'
              required
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup>
            <Switch
              required
              name='esterilizado'
              label='Esterilizado'
              innerLabel='No'
              inline
              innerLabelChecked='Si'
            />
            <Switch
              required
              name='chip'
              label='Chip'
              innerLabel='No'
              inline
              innerLabelChecked='Si'
            />
            <Switch
              required
              name='vacunas'
              label='Vacunas al día'
              innerLabel='No'
              inline
              innerLabelChecked='Si'
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup label='Tamaño *'>
            <Radio
              name='tamaño-mascota'
              value={size}
              checked={Boolean(size)}
              required
              css={fakeRadioGroupStyle}
            />
            <Radio
              onChange={this.onRadioGroupChanged}
              checked={size === 's'}
              label='Pequeño'
              value='s'
            />
            <Radio
              onChange={this.onRadioGroupChanged}
              checked={size === 'm'}
              label='Mediano'
              value='m'
            />
            <Radio
              onChange={this.onRadioGroupChanged}
              checked={size === 'l'}
              label='Grande'
              value='l'
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup label='Edad'>
            <InputGroup name='edad-mascota' placeholder='Años' />
          </FormGroup>
        </div>
        <div>
          <FormGroup label='Información Extra'>
            <TextArea
              fill
              growVertically
              name='informacion-extra-mascota'
              placeholder='Extra'
            />
          </FormGroup>
        </div>
      </Card>
    );
  }
}
