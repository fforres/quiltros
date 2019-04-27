/** @jsx jsx */
import { Card, Elevation } from '@blueprintjs/core';
import { jsx } from '@emotion/core';
import React, { Component } from 'react';
import { canvasStyle } from './style';

import { Layer, Stage } from 'react-konva';
import { ITextBlocksConfigPanelState } from '../leftSidebar/textBlocksCreator/panel';
import BackgroundImage from './backgroundImage';
import Text from './Text';
import TransformerComponent from './transformer';

interface IAppProps {
  image: HTMLImageElement | null;
  textBlocks: { [s: string]: ITextBlocksConfigPanelState };
}

interface IAppState {
  backgroundImage: HTMLImageElement | null;
  selectedShapeName: string;
}
class Canvas extends Component<IAppProps, IAppState> {
  state = {
    backgroundImage: null,
    canvasHeight: 750,
    canvasWidth: 500,
    selectedShapeName: ''
  };

  resizeImageHeight = (img, newHeight, newWidth) => {
    const canvas = document.createElement('canvas');
    canvas.height = newHeight;
    canvas.width = newWidth;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return Promise.resolve(img);
    }
    return new Promise((resolve, reject) => {
      ctx.drawImage(img, 0, 0);
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      const dataurl = canvas.toDataURL('image/png');

      const newImage = new Image();
      newImage.src = dataurl;
      newImage.addEventListener('load', () => {
        resolve(newImage);
      });
      newImage.addEventListener('error', () => {
        reject(img);
      });
    });
  };

  getResizedImage = (image: HTMLImageElement) => {
    const { height, width } = image;
    const { canvasHeight, canvasWidth } = this.state;
    let imageHeight = height;
    let imageWidth = width;
    // Resize to go over the canvas height
    imageWidth = imageWidth * (canvasHeight / imageHeight);
    imageHeight = canvasHeight;

    // Resize to go over the canvas width
    if (canvasWidth > imageWidth) {
      imageHeight = imageHeight * (canvasWidth / imageWidth);
      imageWidth = canvasWidth;
    }
    return this.resizeImageHeight(image, imageHeight, imageWidth);
  };

  async componentDidUpdate(prevProps) {
    const { image } = this.props;
    if (this.props.image !== prevProps.image) {
      if (image) {
        const newImage = await this.getResizedImage(image);
        this.setState({ backgroundImage: newImage });
      }
    }
  }

  handleStageMouseDown = e => {
    // If the thing we are clicking is the canvas,
    // unselect the transformer
    const { target } = e;
    if (target === target.getStage()) {
      this.setState({
        selectedShapeName: ''
      });
      return;
    }
    // If the thing we are clicking is the transformer - do nothing
    const clickedOnTransformer = target.getParent().className === 'Transformer';
    if (clickedOnTransformer) {
      return;
    }

    // If the thing we are clicking has no name, do nothing
    const name = target.name();
    if (!name) {
      return;
    }
    // find clicked rect by its name
    this.setState({
      selectedShapeName: name
    });
  };

  render() {
    const {
      backgroundImage,
      canvasHeight,
      canvasWidth,
      selectedShapeName
    } = this.state;
    const { textBlocks } = this.props;
    return (
      <Card elevation={Elevation.ONE} css={canvasStyle}>
        {process.browser && (
          <Stage
            width={canvasWidth}
            height={canvasHeight}
            onMouseDown={this.handleStageMouseDown}
          >
            <BackgroundImage
              backgroundImage={backgroundImage}
              canvasHeight={canvasHeight}
              canvasWidth={canvasWidth}
            />
            <Layer>
              {Object.values(textBlocks).map(textBlock => {
                return <Text key={textBlock.id} {...textBlock} />;
              })}
              <TransformerComponent
                resizeEnabled
                rotateEnabled={false}
                borderEnabled
                selectedShapeName={selectedShapeName}
              />
            </Layer>
          </Stage>
        )}
      </Card>
    );
  }
}

export default Canvas;
