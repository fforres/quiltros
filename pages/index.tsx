/** @jsx jsx */
import '@blueprintjs/core/lib/css/blueprint.css';
import { jsx } from '@emotion/core';
import React, { Component, createRef } from 'react';
import Canvas from '../client/components/canvas';
import LeftSidebar from '../client/components/leftSidebar';
import { ITextBlocksConfigPanelState } from '../client/components/leftSidebar/textBlocksCreator/panel';
import Nav from '../client/components/nav';
import { containerStyle } from './styles';

interface IHomeState {
  canvasImage: HTMLImageElement | null;
  canvasTexts: ICanvasTexts;
  formValues: IAdoptionForm;
}

export interface ICanvasTexts {
  selectedTextBlock: string; // TODO: Change this for a string union type
  textBlocks: {
    // TODO: Change keys on this objects also for a string uniion type.
    // (Based on the types of TextBlocksCreator.buttonsKeys )
    [s: string]: ITextBlocksConfigPanelState;
  };
}

export interface IAdoptionForm {
  'nombre-mascota': string;
  'nombre-contacto': string;
  'telefono-contacto': string;
  'whatsapp-contacto': string;
  'email-contacto': string;
  esterilizado: boolean;
  chip: boolean;
  vacunas: boolean;
  'edad-mascota': string;
  'informacion-extra-mascota'?: string;
  'tamaño-mascota': boolean;
}

class Home extends Component<any, IHomeState> {
  state = {
    canvasImage: null,
    canvasTexts: {
      selectedTextBlock: '',
      textBlocks: {}
    },
    formValues: {
      chip: false,
      'edad-mascota': '',
      'email-contacto': '',
      esterilizado: false,
      'informacion-extra-mascota': '',
      'nombre-contacto': '',
      'nombre-mascota': '',
      'tamaño-mascota': false,
      'telefono-contacto': '',
      vacunas: false,
      'whatsapp-contacto': ''
    }
  };

  stageRef = createRef<any>();

  setSelectedTextBlock = selectedTextBlock => {
    const { canvasTexts } = this.state;
    this.setState({
      canvasTexts: {
        ...canvasTexts,
        selectedTextBlock
      }
    });
  };

  setCanvasImage = (image: HTMLImageElement) => {
    this.setState({
      canvasImage: image
    });
  };

  onTextChanged = (s: ITextBlocksConfigPanelState) => {
    const { canvasTexts } = this.state;
    const { textBlocks } = canvasTexts;
    this.setState({
      canvasTexts: {
        ...canvasTexts,
        textBlocks: {
          ...textBlocks,
          [s.id]: s
        }
      }
    });
  };

  setAdoptionFormField = (key: keyof IAdoptionForm, value: any) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [key]: value
      }
    });
  };

  render() {
    const { canvasImage, canvasTexts, formValues } = this.state;
    const { selectedTextBlock } = canvasTexts;

    return (
      <div>
        <Nav onImageUploaded={this.setCanvasImage} />
        <section data-name="bodycontainer" css={containerStyle}>
          <LeftSidebar
            canvasRef={this.stageRef}
            formValues={formValues}
            onMainTextButtonPressed={this.setSelectedTextBlock}
            selectedTextBlock={selectedTextBlock}
            onInputChanged={this.setAdoptionFormField}
            onTextChanged={this.onTextChanged}
          />
          <Canvas
            canvasRef={this.stageRef}
            onTextBlockSelected={this.setSelectedTextBlock}
            onRef={this.stageRef}
            canvasTexts={canvasTexts}
            image={canvasImage}
          />
        </section>
      </div>
    );
  }
}

export default Home;
