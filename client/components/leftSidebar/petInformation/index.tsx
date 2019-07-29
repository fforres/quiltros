/** @jsx jsx */
import {
  Card,
  Checkbox,
  Elevation,
  FormGroup,
  H4,
  InputGroup,
  Radio,
  TextArea
} from '@blueprintjs/core';
import { jsx } from '@emotion/core';
import React, { FormEvent } from 'react';
import { IAdoptionForm } from '../../../../pages';
import { fakeRadioGroupStyle, sidebarContainerStyle } from './style';

export interface IPetInformationProps {
  onChange: (key: keyof IAdoptionForm, value: any) => void;
  formValues: IAdoptionForm;
}

export default class PetInformation extends React.Component<
  IPetInformationProps,
  any
> {
  state = {
    size: undefined
  };

  onRadioGroupChanged = (e: FormEvent<HTMLInputElement>) => {
    const size = e.currentTarget.value;
    this.setState({ size });
  };

  render() {
    const { onChange, formValues } = this.props;
    const { size } = this.state;
    return (
      <Card elevation={Elevation.ONE} css={sidebarContainerStyle}>
        <H4>Información</H4>
        <div>
          <FormGroup label={'Nombre'}>
            <InputGroup
              name="nombre-mascota"
              placeholder="Nombre"
              intent="primary"
              value={formValues['nombre-mascota']}
              onChange={e => {
                onChange('nombre-mascota', e.currentTarget.value);
              }}
              required
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup label="Tamaño *">
            <Radio
              name="tamaño-mascota"
              value={size}
              onChange={e => onChange('tamaño-mascota', Boolean(size))}
              checked={Boolean(size)}
              required
              css={fakeRadioGroupStyle}
            />
            <Radio
              onChange={this.onRadioGroupChanged}
              checked={size === 's'}
              label="Pequeño"
              value="s"
            />
            <Radio
              onChange={this.onRadioGroupChanged}
              checked={size === 'm'}
              label="Mediano"
              value="m"
            />
            <Radio
              onChange={this.onRadioGroupChanged}
              checked={size === 'l'}
              label="Grande"
              value="l"
            />
          </FormGroup>
        </div>
        <div>
          <Checkbox
            name="esterilizado"
            label="¿Está esterilizado?"
            checked={formValues.esterilizado}
            onChange={e => {
              onChange('esterilizado', !formValues.esterilizado);
            }}
          />
          <Checkbox
            name="chip"
            label="¿Tiene chip?"
            checked={formValues.chip}
            onChange={e => {
              onChange('chip', !formValues.chip);
            }}
          />
          <Checkbox
            name="vacunas"
            label="¿Tiene las vacunas al día?"
            checked={formValues.vacunas}
            onChange={e => {
              onChange('vacunas', !formValues.vacunas);
            }}
          />
        </div>
        <div>
          <FormGroup label="Edad">
            <InputGroup
              name="edad-mascota"
              value={formValues['edad-mascota']}
              onChange={e => onChange('edad-mascota', e.currentTarget.value)}
              placeholder="Años"
              required
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup label="Información Extra">
            <TextArea
              fill
              growVertically
              name="informacion-extra-mascota"
              placeholder="Extra"
              value={formValues['informacion-extra-mascota']}
              onChange={e =>
                onChange('informacion-extra-mascota', e.currentTarget.value)
              }
            />
          </FormGroup>
        </div>
      </Card>
    );
  }
}
