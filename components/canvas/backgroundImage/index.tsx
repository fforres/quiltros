/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';

import { Image as KonvaImage, Layer } from 'react-konva';

export interface IBackgroundImageProps {
  backgroundImage: HTMLImageElement | null;
  canvasHeight: number;
  canvasWidth: number;
}

export default class BackgroundImage extends React.Component<
  IBackgroundImageProps,
  any
> {
  render() {
    const { backgroundImage, canvasHeight, canvasWidth } = this.props;
    if (!backgroundImage) {
      return null;
    }
    const { height, width } = backgroundImage;
    const medianWidth = -(width - canvasWidth) / 2;
    const medianHeight = -(height - canvasHeight) / 2;

    return (
      <Layer>
        {backgroundImage && (
          <KonvaImage
            image={backgroundImage}
            x={medianWidth}
            y={medianHeight}
          />
        )}
      </Layer>
    );
  }
}
