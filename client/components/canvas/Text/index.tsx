/** @jsx jsx */
import { jsx } from '@emotion/core';
import { KonvaEventObject } from 'konva/types/types';
import React, { createRef } from 'react';
import { Text } from 'react-konva';
import { ITextBlocksConfigPanelState } from '../../leftSidebar/textBlocksCreator/panel';

interface ICanvasText extends ITextBlocksConfigPanelState {
  maxWidth: number;
  maxHeight: number;
  position: {
    x: number;
    y: number;
  };
  // width: number;
  // height: number;
  onDoubleClick: (evt: KonvaEventObject<MouseEvent>) => void;
  onClick: (evt: KonvaEventObject<MouseEvent>) => void;
  onMouseDown: (evt: KonvaEventObject<MouseEvent>) => void;
  id: string;
}

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
    console.log();
    return {
      fontSize: stateFontSize
    };
  }

  state = {
    fontSize: 10
  };

  transformerRef = createRef<any>();

  getNewPosition = pos => {
    const { maxWidth, maxHeight } = this.props;
    const ref = this.transformerRef.current!;

    const topBorder = pos.y;
    const bottomBorder = pos.y + ref.height();
    const leftBorder = pos.x;
    const rightBorder = pos.x + ref.width();

    let x = pos.x;
    let y = pos.y;
    if (topBorder < 0) {
      y = 0;
    } else if (bottomBorder > maxHeight) {
      y = maxHeight - ref.height();
    }

    if (leftBorder < 0) {
      x = 0;
    } else if (rightBorder > maxWidth) {
      x = maxWidth - ref.width();
    }
    return {
      x,
      y
    };
  };

  onTransform = () => {
    const ref = this.transformerRef.current!;
    ref.setAttrs({
      scaleX: 1,
      width: ref.width() * ref.scaleX()
    });
  };

  onDrag = pos => {
    return this.getNewPosition(pos);
  };

  render() {
    const {
      id,
      text,
      color,
      onDoubleClick,
      onClick,
      onMouseDown,
      position
    } = this.props;
    const { fontSize } = this.state;
    return (
      <Text
        padding={10}
        fontSize={fontSize}
        ref={this.transformerRef}
        name={id}
        id={id}
        fill={color}
        text={text}
        x={position.x}
        y={position.y}
        transformsEnabled="position"
        draggable
        dragBoundFunc={this.onDrag}
        onTransform={this.onTransform}
        onClick={onClick}
        onDblClick={onDoubleClick}
        onMouseDown={onMouseDown}
        // _useStrictMode
      />
    );
  }
}

export default CanvasText;
