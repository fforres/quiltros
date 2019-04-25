/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { FormEvent } from 'react';

import { Button } from '@blueprintjs/core';
import ContactInformation from './contactInformation';
import PetInformation from './petInformation';
import SubmitButton from './submitButton';
import TextBlocksCreator from './textBlocksCreator';
import { ITextBlocksConfigPanelState } from './textBlocksCreator/panel';

export interface ILeftSidebarProps {
  onTextChanged: (arg1: ITextBlocksConfigPanelState) => void;
}

export interface ILeftSidebarState {
  isFormValid: boolean;
}

export default class LeftSidebar extends React.Component<
  ILeftSidebarProps,
  ILeftSidebarState
> {
  static validInputNames = [
    'nombre',
    'esterilizado',
    'chip',
    'vacunas',
    'tamaño',
    'extra',
    'teléfono',
    'whatsapp',
    'email',
    'texto'
  ];

  state = {
    isFormValid: false
  };

  onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validInputNamesSet = new Set(LeftSidebar.validInputNames);
    const formData = Array.from(e.currentTarget as any)
      .filter((formElement: any) => formElement.name)
      .map((formElement: any) => {
        const { name, value } = formElement;
        const mappedFormElement = {
          name: name.toLowerCase(),
          value
        };
        if (formElement.type === 'checkbox') {
          mappedFormElement.value = formElement.value === 'on';
        }
        return mappedFormElement;
      })
      .filter(mappedFormElement => {
        return validInputNamesSet.has(mappedFormElement.name);
      })
      .reduce(
        (form, el: any) => ({
          ...form,
          [el.name]: el.value
        }),
        {}
      );
  };

  onFormChange = (e: FormEvent<HTMLFormElement>) => {
    this.setState({
      isFormValid: e.currentTarget.checkValidity()
    });
  };

  render() {
    const { onTextChanged } = this.props;
    return (
      <form onSubmit={this.onSubmit} onChange={this.onFormChange}>
        <SubmitButton />
        <PetInformation />
        <ContactInformation />
        <TextBlocksCreator onTextChanged={onTextChanged} />
        <SubmitButton />
      </form>
    );
  }
}
