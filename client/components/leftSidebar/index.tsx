/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Component, FormEvent, RefObject } from 'react';
import ReactGA from 'react-ga';

import { IAdoptionForm } from '../../../pages';
import ContactInformation from './contactInformation';
import PetInformation from './petInformation';
import SubmitButton from './submitButton';
import TextBlocksCreator from './textBlocksCreator';
import { ITextBlocksConfigPanelState } from './textBlocksCreator/panel';

export interface ILeftSidebarProps {
  canvasRef: RefObject<any>;
  formValues: IAdoptionForm;
  selectedTextBlock: string;
  textBlocks: {
    [id: string]: ITextBlocksConfigPanelState;
  };
  addTextBlock: () => void;
  onInputChanged: (key: keyof IAdoptionForm, value: any) => void;
  onTextBlockInteracted: (key: string) => void;
  onTextChanged: (arg1: ITextBlocksConfigPanelState) => void;
}

export interface ILeftSidebarState {
  isFormValid: boolean;
}

export default class LeftSidebar extends Component<
  ILeftSidebarProps,
  ILeftSidebarState
> {
  state = {
    isFormValid: false
  };

  getFormData = (): { formData: FormData; formJson: object } => {
    const formData = new FormData();
    const { formValues } = this.props;
    for (const key in formValues) {
      if (formValues.hasOwnProperty(key)) {
        const element = formValues[key];
        formData.append(key, element);
      }
    }
    const imageBlob = this.onExportImageClicked();
    formData.append('image', imageBlob);
    return {
      formData,
      formJson: formValues
    };
  };

  dataURItoBlob = dataURI => {
    let byteString;
    let mimestring;

    if (dataURI.split(',')[0].indexOf('base64') !== -1) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = decodeURI(dataURI.split(',')[1]);
    }
    mimestring = dataURI
      .split(',')[0]
      .split(':')[1]
      .split(';')[0];
    const content = new Array();
    for (let i = 0; i < byteString.length; i++) {
      content[i] = byteString.charCodeAt(i);
    }
    return new Blob([new Uint8Array(content)], { type: mimestring });
  };

  onExportImageClicked = () => {
    const imgB64 = this.props.canvasRef.current!.toDataURL({ pixelRatio: 2 });
    const blob = this.dataURItoBlob(imgB64);
    return blob;
  };

  onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { formData, formJson } = this.getFormData();
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
    const isFormValid = e.currentTarget.checkValidity();
    this.setState({
      isFormValid
    });
  };

  render() {
    const {
      onTextChanged,
      formValues,
      onInputChanged,
      onTextBlockInteracted,
      selectedTextBlock,
      addTextBlock,
      textBlocks
    } = this.props;
    return (
      <form onSubmit={this.onSubmit} onChange={this.onFormChange}>
        <PetInformation onChange={onInputChanged} formValues={formValues} />
        <ContactInformation onChange={onInputChanged} formValues={formValues} />
        <TextBlocksCreator
          onAddTextBlockClicked={addTextBlock}
          onTextBlockInteracted={onTextBlockInteracted}
          onTextChanged={onTextChanged}
          onChange={onInputChanged}
          selectedTextBlock={selectedTextBlock}
          textBlocks={textBlocks}
          formValues={formValues}
        />
        <SubmitButton />
      </form>
    );
  }
}
