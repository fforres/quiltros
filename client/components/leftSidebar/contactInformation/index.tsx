/** @jsx jsx */
import { Card, Elevation, FormGroup, H4, InputGroup } from '@blueprintjs/core';
import { jsx } from '@emotion/core';
import React from 'react';
import { IAdoptionForm } from '../../../../pages';
import { sidebarContainerStyle } from './style';

export interface IContactInformationProps {
  onChange: (key: keyof IAdoptionForm, value: any) => void;
  formValues: IAdoptionForm;
}

export default class ContactInformation extends React.Component<
  IContactInformationProps,
  any
> {
  render() {
    const { onChange, formValues } = this.props;
    return (
      <Card elevation={Elevation.ONE} css={sidebarContainerStyle}>
        <H4>Datos de contacto</H4>
        <div>
          <FormGroup label="Nombre">
            <InputGroup
              placeholder="Nombre"
              name="nombre-contacto"
              required
              value={formValues['nombre-contacto']}
              onChange={e => {
                onChange('nombre-contacto', e.currentTarget.value);
              }}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup label="Teléfono">
            <InputGroup
              placeholder="Teléfono"
              name="telefono-contacto"
              value={formValues['telefono-contacto']}
              onChange={e => {
                onChange('telefono-contacto', e.currentTarget.value);
              }}
              required
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup label="Whatsapp">
            <InputGroup
              placeholder="Whatsapp"
              name="whatsapp-contacto"
              value={formValues['whatsapp-contacto']}
              onChange={e => {
                onChange('whatsapp-contacto', e.currentTarget.value);
              }}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup label="Email">
            <InputGroup
              name="Email"
              type="email-contacto"
              placeholder="Email"
              value={formValues['email-contacto']}
              onChange={e => {
                onChange('email-contacto', e.currentTarget.value);
              }}
            />
          </FormGroup>
        </div>
      </Card>
    );
  }
}
