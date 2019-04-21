/** @jsx jsx */
import '@blueprintjs/core/lib/css/blueprint.css';
import { jsx } from '@emotion/core';
import React from 'react';
import Canvas from '../components/canvas';
import LeftSidebar from '../components/leftSidebar';
import Nav from '../components/nav';
import { containerStyle } from './styles';

interface IHomeState {
  canvasImage: HTMLImageElement | null;
}

class Home extends React.PureComponent<any, IHomeState> {
  state = {
    canvasImage: null
  };

  setCanvasImage = (image: HTMLImageElement) => {
    this.setState({
      canvasImage: image
    });
  };

  render() {
    const { canvasImage } = this.state;

    return (
      <div>
        <Nav onImageUploaded={this.setCanvasImage} />
        <section data-name='bodycontainer' css={containerStyle}>
          <LeftSidebar />
          <Canvas image={canvasImage} />
        </section>
      </div>
    );
  }
}

export default Home;
