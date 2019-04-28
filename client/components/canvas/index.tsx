/** @jsx jsx */
import { Button, Card, Elevation } from '@blueprintjs/core';
import { jsx } from '@emotion/core';
import React, { Component, createRef } from 'react';
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

  stageRef = createRef<any>();

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
    const imgB64 = this.stageRef.current!.toDataURL({ pixelRatio: 3 });
    const blob = this.dataURItoBlob(imgB64);
    console.log(blob);
    // let fd = new FormData(document.forms[0]);
    // fd.append("canvasImage", blob);
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
            ref={this.stageRef}
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
        <Button onClick={this.onExportImageClicked}> Export Image </Button>
      </Card>
    );
  }
}

export default Canvas;
