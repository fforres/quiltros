/** @jsx jsx */
import { Card, Elevation } from '@blueprintjs/core';
import { jsx } from '@emotion/core';
import { KonvaEventObject } from 'konva/types/types';
import React, { Component, createRef, RefObject } from 'react';
import { Layer, Stage } from 'react-konva';

import { ICanvasTexts } from '../../../pages';
import BackgroundImage from './backgroundImage';
import { canvasStyle } from './style';
import CanvasText from './Text';
import TransformerComponent from './transformer';

interface IAppProps {
  onRef: RefObject<any>;
  canvasRef: RefObject<any>;
  onTextBlockSelected: (arg1: string) => void;
  image: HTMLImageElement | null;
  canvasTexts: ICanvasTexts;
}

interface IAppState {
  backgroundImage: HTMLImageElement | null;
}
class Canvas extends Component<IAppProps, IAppState> {
  state = {
    backgroundImage: null,
    canvasHeight: 750,
    canvasWidth: 500
  };

  transformerRef = createRef<any>();

  resizeImageHeight = (img, newHeight, newWidth): Promise<HTMLImageElement> => {
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
    if (image && image !== prevProps.image) {
      const backgroundImage = await this.getResizedImage(image);
      this.setState({ backgroundImage });
    }
  }

  handleStageMouseDown = e => {
    // If the thing we are clicking is the canvas,
    // unselect the transformer
    const { onTextBlockSelected } = this.props;
    const { target } = e;
    if (target === target.getStage()) {
      onTextBlockSelected('');
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
    onTextBlockSelected(name);
  };

  onDoubleClick = (evt: KonvaEventObject<MouseEvent>) => {
    const currentTarget: any = evt.target;
    const transformerRef = this.transformerRef.current!;
    const canvasRef = this.props.canvasRef.current!;
    currentTarget.hide();
    transformerRef.hide();
    canvasRef.draw();

    // create textarea over canvas with absolute position
    // first we need to find position for textarea
    // how to find it?

    // at first lets find position of text node relative to the stage:
    const { x, y } = currentTarget.absolutePosition();
    const { left, top } = canvasRef.container().getBoundingClientRect();

    // so position of textarea will be the sum of positions above:
    const areaPosition = {
      x: left + x,
      y: top + y
    };

    // // create textarea and style it
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    // apply many styles to match text on canvas as close as possible
    // remember that text rendering on canvas and on the textarea can be different
    // and sometimes it is hard to make it 100% the same. But we will try...
    textarea.value = currentTarget.text();
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x + 'px';
    textarea.style.width =
      currentTarget.width() - currentTarget.padding() * 2 + 'px';
    textarea.style.height =
      currentTarget.height() - currentTarget.padding() * 2 + 5 + 'px';
    textarea.style.fontSize = currentTarget.fontSize() + 'px';
    textarea.style.border = 'none';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.lineHeight = currentTarget.lineHeight();
    textarea.style.fontFamily = currentTarget.fontFamily();
    textarea.style.transformOrigin = 'left top';
    textarea.style.textAlign = currentTarget.align();
    textarea.style.color = currentTarget.fill();

    const rotation = currentTarget.rotation();
    let transform = '';
    if (rotation) {
      transform += 'rotateZ(' + rotation + 'deg)';
    }
    const fontSize = 10;
    let px = 0;
    // also we need to slightly move textarea on firefox
    // because it jumps a bit
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isEdge = document.documentMode || /Edge/.test(navigator.userAgent);

    if (isFirefox) {
      px += 2 + Math.round(fontSize / 20);
    }

    transform += 'translateY(-' + px + 'px)';
    textarea.style.transform = transform;
    // reset height
    textarea.style.height = 'auto';
    // after browsers resized it we can set actual value
    textarea.style.height = textarea.scrollHeight + 3 + 'px';
    textarea.focus();

    const removeTextarea = () => {
      const parentNode = textarea.parentNode;
      if (parentNode) {
        parentNode.removeChild(textarea);
        window.removeEventListener('click', handleOutsideClick);
        currentTarget.show();
        transformerRef.show();
        transformerRef.forceUpdate();
        canvasRef.draw();
      }
    };

    const setTextareaWidth = newWidth => {
      if (!newWidth) {
        // set width for placeholder
        newWidth = currentTarget.placeholder.length * currentTarget.fontSize();
      }
      if (isSafari || isFirefox) {
        newWidth = Math.ceil(newWidth);
      }
      if (isEdge) {
        newWidth += 1;
      }
      textarea.style.width = newWidth + 'px';
    };

    textarea.addEventListener('keydown', e => {
      // hide on enter
      // but don't hide on shift + enter
      if (e.keyCode === 13 && !e.shiftKey) {
        currentTarget.text(textarea.value);
        removeTextarea();
      }
      // on esc do not set value back to node
      if (e.keyCode === 27) {
        removeTextarea();
      }
    });

    textarea.addEventListener('keydown', e => {
      const scale = currentTarget.getAbsoluteScale().x;
      setTextareaWidth(currentTarget.width() * scale);
      textarea.style.height = 'auto';
      textarea.style.height =
        textarea.scrollHeight + currentTarget.fontSize() + 'px';
    });

    const handleOutsideClick = e => {
      if (e.target === textarea) {
        return;
      }
      removeTextarea();
    };
    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    });
  };

  onMount = ref => {
    this.transformerRef = ref;
  };

  render() {
    const { backgroundImage, canvasHeight, canvasWidth } = this.state;
    const { canvasTexts, onRef } = this.props;
    const { textBlocks, selectedTextBlock } = canvasTexts;
    return (
      <Card elevation={Elevation.ONE} css={canvasStyle}>
        {process.browser && (
          <Stage
            ref={onRef}
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
              {Object.values(textBlocks).map(textBlock => (
                <CanvasText
                  key={textBlock.id}
                  {...textBlock}
                  onDoubleClick={this.onDoubleClick}
                />
              ))}
              <TransformerComponent
                resizeEnabled
                rotateEnabled={false}
                borderEnabled
                onMount={this.onMount}
                selectedShapeName={selectedTextBlock}
              />
            </Layer>
          </Stage>
        )}
      </Card>
    );
  }
}

export default Canvas;
