/** @jsx jsx */
import '@blueprintjs/core/lib/css/blueprint.css';
import { jsx } from '@emotion/core';
import React, { Component } from 'react';
import Canvas from '../client/components/canvas';
import LeftSidebar from '../client/components/leftSidebar';
import { ITextBlocksConfigPanelState } from '../client/components/leftSidebar/textBlocksCreator/panel';
import Nav from '../client/components/nav';
import { containerStyle } from './styles';

interface IHomeState {
  image?: Blob;
  canvasImage: HTMLImageElement | null;
  textBlocks: { [s: string]: ITextBlocksConfigPanelState };
  formValues: IAdoptionForm;
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
  tamaño?: 's' | 'm' | 'l';
  extra?: string;
  teléfono?: string;
  whatsapp?: string;
  email?: string;
  texto?: string;
}

class Home extends Component<any, IHomeState> {
  state = {
    canvasImage: null,
    formValues: {
      chip: false,
      'edad-mascota': '',
      esterilizado: false,
      'informacion-extra-mascota': '',
      nombre: '',
      'nombre-mascota': '',
      vacunas: false
    },
    image: undefined,
    textBlocks: {}
  };

  setCanvasImage = (image: HTMLImageElement) => {
    this.setState({
      canvasImage: image
    });
  };

  onTextChanged = (s: ITextBlocksConfigPanelState) => {
    const { textBlocks } = this.state;
    this.setState({
      textBlocks: {
        ...textBlocks,
        [s.id]: s
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

  onImageCreated = (image: Blob) => {
    this.setState({ image });
  };

  render() {
    const { canvasImage, textBlocks, image, formValues } = this.state;

    return (
      <div>
        <Nav onImageUploaded={this.setCanvasImage} />
        <section data-name='bodycontainer' css={containerStyle}>
          <LeftSidebar
            formValues={formValues}
            onInputChanged={this.setAdoptionFormField}
            createdImage={image}
            onTextChanged={this.onTextChanged}
          />
          <Canvas
            onImageCreated={this.onImageCreated}
            textBlocks={textBlocks}
            image={canvasImage}
          />
        </section>
      </div>
    );
  }
}

export default Home;
