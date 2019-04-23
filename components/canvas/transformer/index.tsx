/** @jsx jsx */
import { jsx } from '@emotion/core';
import Konva from 'konva';
import React, { createRef } from 'react';
import { Transformer } from 'react-konva';

interface ITransformerComponent extends Konva.TransformerConfig {
  selectedShapeName: string;
  minWidth?: number;
}

class TransformerComponent extends React.Component<ITransformerComponent> {
  static defaultProps = {
    minWidth: 50
  };
  transformerRef = createRef<any>();

  componentDidMount() {
    this.checkNode();
  }
  componentDidUpdate() {
    this.checkNode();
  }
  checkNode() {
    // We manually attach or detach a node to the Transformer
    const ref = this.transformerRef.current!;
    const stage = ref.getStage();
    const { selectedShapeName } = this.props;
    const selectedNode = stage.findOne('.' + selectedShapeName);
    // do nothing if the selected node is already attached to the transformer
    if (selectedNode === ref.node()) {
      return;
    }
    if (selectedNode) {
      // attach transformer to another node
      ref.attachTo(selectedNode);
    } else {
      // remove current ref from the fransformer
      ref.detach();
    }
    // Trigger a draw for the layer
    ref.getLayer().batchDraw();
  }

  boundFoxFunction = (oldBox, newBox) => {
    const { minWidth } = this.props;
    const ref = this.transformerRef.current!;
    const stageWidth = ref.getStage().width();
    if (newBox.width > stageWidth - 10) {
      const maxWidth = Math.min(newBox.width, stageWidth - 10);
      newBox.width = maxWidth;
    } else {
      const width = Math.max(minWidth, newBox.width);
      newBox.width = width;
    }
    return newBox;
  };

  render() {
    const { selectedShapeName, ...rest } = this.props;
    return (
      <Transformer
        ref={this.transformerRef}
        enabledAnchors={['middle-left', 'middle-right']}
        boundBoxFunc={this.boundFoxFunction}
        {...rest}
      />
    );
  }
}

export default TransformerComponent;
