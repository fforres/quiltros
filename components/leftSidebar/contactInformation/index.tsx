/** @jsx jsx */
import { Card, Elevation, FormGroup, H4, InputGroup } from '@blueprintjs/core';
import { jsx } from '@emotion/core';
import React from 'react';
import { sidebarContainerStyle } from './style';

export interface IContactInformationProps {}

export default class ContactInformation extends React.Component<
  IContactInformationProps,
  any
> {
  render() {
    return (
      <Card elevation={Elevation.ONE} css={sidebarContainerStyle}>
        <H4>Datos de contacto</H4>
        <div>
          <FormGroup label='Nombre'>
            <InputGroup placeholder='Nombre' name='nombre-contacto' required />
          </FormGroup>
        </div>
        <div>
          <FormGroup label='Teléfono'>
            <InputGroup
              placeholder='Teléfono'
              name='telefono-contacto'
              required
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup label='Whatsapp'>
            <InputGroup placeholder='Whatsapp' name='whatsapp-contacto' />
          </FormGroup>
        </div>
        <div>
          <FormGroup label='Email'>
            <InputGroup
              name='Email'
              type='email-contacto'
              placeholder='Email'
            />
          </FormGroup>
        </div>
      </Card>
    );
  }
}
