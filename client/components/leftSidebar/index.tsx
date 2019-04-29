/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { FormEvent } from 'react';
import ReactGA from 'react-ga';

import ContactInformation from './contactInformation';
import PetInformation from './petInformation';
import SubmitButton from './submitButton';
import TextBlocksCreator from './textBlocksCreator';
import { ITextBlocksConfigPanelState } from './textBlocksCreator/panel';

export interface ILeftSidebarProps {
  createdImage?: Blob;
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

  getFormData = (e: FormEvent): { formData: FormData; formJson: object } => {
    const validInputNamesSet = new Set(LeftSidebar.validInputNames);
    const formData = new FormData();
    const formJson = {};
    Array.from(e.currentTarget as any)
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
      .forEach(el => {
        formJson[el.name] = el.value;
        formData.append(el.name, el.value);
      });
    const { createdImage } = this.props;
    if (createdImage) {
      formData.append('image', createdImage);
    }
    return {
      formData,
      formJson
    };
  };

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { formData, formJson } = this.getFormData(e);
    const response = await fetch('/api/image', {
      body: formData,
      method: 'POST'
    }).then(r => r.json());

    ReactGA.event({
      action: 'adoption-created',
      category: 'User',
      value: 1,
      ...formJson
    });
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
