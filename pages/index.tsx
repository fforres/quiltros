/** @jsx jsx */
import '@blueprintjs/core/lib/css/blueprint.css';
import { jsx } from '@emotion/core';
import React from 'react';
import Canvas from '../components/canvas';
import LeftSidebar from '../components/leftSidebar';
import { ITextBlocksConfigPanelState } from '../components/leftSidebar/textBlocksCreator/panel';
import Nav from '../components/nav';
import { containerStyle } from './styles';

interface IHomeState {
  canvasImage: HTMLImageElement | null;
  textBlocks: { [s: string]: ITextBlocksConfigPanelState };
}

class Home extends React.PureComponent<any, IHomeState> {
  state = {
    canvasImage: null,
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

  render() {
    const { canvasImage, textBlocks } = this.state;

    return (
      <div>
        <Nav onImageUploaded={this.setCanvasImage} />
        <section data-name='bodycontainer' css={containerStyle}>
          <LeftSidebar onTextChanged={this.onTextChanged} />
          <Canvas textBlocks={textBlocks} image={canvasImage} />
        </section>
      </div>
    );
  }
}

export default Home;
