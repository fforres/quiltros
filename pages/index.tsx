/** @jsx jsx */
import '@blueprintjs/core/lib/css/blueprint.css';
import { jsx } from '@emotion/core';
import nanoid from 'nanoid';
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

  componentDidMount() {
    this.addTextBlock();
  }

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

  onTextChanged = (key, value, id) => {
    const { canvasTexts } = this.state;
    const { textBlocks } = canvasTexts;
    this.setState({
      canvasTexts: {
        ...canvasTexts,
        textBlocks: {
          ...textBlocks,
          [id]: {
            ...textBlocks[id],
            [key]: value
          }
        }
      }
    });
  };

  onTextBlockChanged = (id, text) => {
    const { canvasTexts } = this.state;
    const { textBlocks } = canvasTexts;
    this.setState(
      {
        canvasTexts: {
          ...canvasTexts,
          textBlocks: {
            ...textBlocks,
            [id]: {
              ...textBlocks[id],
              text
            }
          }
        }
      },
      () => {
        console.log(this.state);
      }
    );
  };

  setAdoptionFormField = (key: keyof IAdoptionForm, value: any) => {
    this.setState({
      formValues: {
        ...this.state.formValues,
        [key]: value
      }
    });
  };

  addTextBlock = () => {
    const { canvasTexts } = this.state;
    const { textBlocks } = canvasTexts;

    const id = nanoid();
    const newTextblock: ITextBlocksConfigPanelState = {
      color: 'black',
      fontSize: 'medium',
      id,
      text: ''
    };

    this.setState({
      canvasTexts: {
        ...canvasTexts,
        textBlocks: {
          ...textBlocks,
          [id]: newTextblock
        }
      }
    });
  };

  render() {
    const { canvasImage, canvasTexts, formValues } = this.state;
    const { selectedTextBlock, textBlocks } = canvasTexts;

    return (
      <div>
        <Nav onImageUploaded={this.setCanvasImage} />
        <section data-name="bodycontainer" css={containerStyle}>
          <LeftSidebar
            addTextBlock={this.addTextBlock}
            canvasRef={this.stageRef}
            formValues={formValues}
            onTextBlockInteracted={this.setSelectedTextBlock}
            selectedTextBlock={selectedTextBlock}
            textBlocks={textBlocks}
            onInputChanged={this.setAdoptionFormField}
            onTextChanged={this.onTextChanged}
          />
          <Canvas
            canvasRef={this.stageRef}
            canvasTexts={canvasTexts}
            currentCanvasText={canvasTexts[selectedTextBlock]}
            image={canvasImage}
            onRef={this.stageRef}
            onTextChanged={this.onTextBlockChanged}
            onTextBlockSelected={this.setSelectedTextBlock}
          />
        </section>
      </div>
    );
  }
}

export default Home;
