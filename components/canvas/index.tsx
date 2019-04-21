/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Component, createRef } from 'react';
import { canvasStyle } from './style';

import { Layer, Stage, Text } from 'react-konva';
import BackgroundImage from './backgroundImage';

interface IAppProps {
  image: HTMLImageElement | null;
}

interface IAppState {
  backgroundImage: HTMLImageElement | null;
}
class Canvas extends Component<IAppProps, IAppState> {
  canvasRef = createRef<HTMLCanvasElement>();

  state = {
    backgroundImage: null,
    canvasHeight: 768,
    canvasWidth: 1280
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

  // handleDragEnd = e => {
  //   e.target.to({
  //     duration: 0.5,
  //     easing: Konva.Easings.ElasticEaseOut,
  //     scaleX: 1,
  //     scaleY: 1,
  //     shadowOffsetX: 5,
  //     shadowOffsetY: 5
  //   });
  // };

  onDoubleClickText = e => {
    const textPosition = e.target.absolutePosition();
    const stageBox = e.target
      .getStage()
      .container()
      .getBoundingClientRect();
    const areaPosition = {
      x: stageBox.left + textPosition.x,
      y: stageBox.top + textPosition.y
    };
  };

  async componentDidUpdate(prevProps, prevState) {
    const { image } = this.props;
    if (this.props.image !== prevProps.image) {
      if (image) {
        const newImage = await this.getResizedImage(image);
        this.setState({ backgroundImage: newImage });
      }
    }

    // if (prevState !== this.state) {
    //   const { backgroundImage, canvasHeight, canvasWidth } = this.state;
    //   if (backgroundImage) {
    //     // const { width, height } = backgroundImage
    //     // context.drawImage(backgroundImage, medianWidth, medianHeight);
    //   }
    // }
  }

  render() {
    const { backgroundImage, canvasHeight, canvasWidth } = this.state;
    if (!process.browser) {
      return null;
    }
    return (
      <div css={canvasStyle}>
        <Stage width={canvasWidth} height={canvasHeight}>
          <BackgroundImage
            backgroundImage={backgroundImage}
            canvasHeight={canvasHeight}
            canvasWidth={canvasWidth}
          />
          <Layer>
            <Text
              onDblClick={this.onDoubleClickText}
              text='Try to drag a star'
              draggable={true}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default Canvas;
