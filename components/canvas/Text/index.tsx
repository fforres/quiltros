/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { createRef } from 'react';
import { canvasStyle } from './style';

import { Group, Layer, Stage, Text } from 'react-konva';
import BackgroundImage from './backgroundImage';
import TransformerComponent from './transformer';

class CanvasText extends React.Component<any> {
  transformerRef = createRef<any>();

  onTransform = () => {
    const ref = this.transformerRef.current!;
    if (ref) {
      ref.setAttrs({
        scaleX: 1,
        width: ref.width() * ref.scaleX()
      });
    }
  };

  onDrag = pos => {
    // pos - is the position of the node (relative to canvas)
    const ref = this.transformerRef.current!;
    const stage = ref.getStage();
    const stageWidth = stage.width();
    const stageHeight = stage.height();

    const topBorder = pos.y;
    const bottomBorder = pos.y + ref.height();
    const leftBorder = pos.x;
    const rightBorder = pos.x + ref.width();

    let x = pos.x;
    let y = pos.y;
    if (topBorder < 0) {
      y = 0;
    } else if (bottomBorder > stageHeight) {
      y = stageHeight - ref.height();
    }

    if (leftBorder < 0) {
      x = 0;
    } else if (rightBorder > stageWidth) {
      x = stageWidth - ref.width();
    }

    return {
      x,
      y
    };
  };
  render() {
    return (
      <Text
        padding={10}
        ref={this.transformerRef}
        name='a-text'
        text='Try to drag a star'
        transformsEnabled='position'
        draggable={true}
        dragBoundFunc={this.onDrag}
        onTransform={this.onTransform}
      />
    );
  }
}

export default CanvasText;
