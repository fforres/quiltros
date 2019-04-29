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
}

class Home extends Component<any, IHomeState> {
  state = {
    canvasImage: null,
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

  onImageCreated = (image: Blob) => {
    this.setState({ image });
  };

  render() {
    const { canvasImage, textBlocks, image } = this.state;

    return (
      <div>
        <Nav onImageUploaded={this.setCanvasImage} />
        <section data-name='bodycontainer' css={containerStyle}>
          <LeftSidebar
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
