/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { createRef } from 'react';
import { Text } from 'react-konva';
import { ITextBlocksConfigPanelState } from '../../leftSidebar/textBlocksCreator/panel';

interface ICanvasText extends ITextBlocksConfigPanelState {}
class CanvasText extends React.Component<ICanvasText, any> {
  static getDerivedStateFromProps(props) {
    let stateFontSize = 10;
    const { fontSize } = props;
    if (fontSize === 'small') {
      stateFontSize = 14;
    }
    if (fontSize === 'medium') {
      stateFontSize = 21;
    }
    if (fontSize === 'large') {
      stateFontSize = 35;
    }
    return {
      fontSize: stateFontSize
    };
  }

  state = {
    fontSize: 10
  };

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
    const { id, text } = this.props;
    const { fontSize } = this.state;
    return (
      <Text
        padding={10}
        fontSize={fontSize}
        ref={this.transformerRef}
        name={id}
        text={text}
        transformsEnabled='position'
        draggable={true}
        dragBoundFunc={this.onDrag}
        onTransform={this.onTransform}
      />
    );
  }
}

export default CanvasText;
