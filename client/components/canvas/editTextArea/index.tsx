/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, {
  Component,
  DetailedHTMLProps,
  TextareaHTMLAttributes
} from 'react';
import ReactDOM from 'react-dom';
import { textaAreaStyle } from './styles';

export interface IEditTextArea {
  maxWidth: number;
  maxHeight: number;
  selectedtextblockid: string;
  onTextAreaChanged: (attr1: string, attr2: string) => void;
  onTextAreaClosed: () => void;
  value: string;
  style: any;
}

class EditTextArea extends Component<IEditTextArea> {
  state = {
    height: ''
  };

  componentDidMount() {
    this.setState({
      height: this.props.style.height
    });
  }

  onChange = e => {
    const { onTextAreaChanged, selectedtextblockid } = this.props;
    const { currentTarget } = e;
    const { height } = this.state;
    const { value, scrollHeight } = currentTarget;
    console.log(selectedtextblockid, value);
    onTextAreaChanged(selectedtextblockid, value);
    if (scrollHeight !== height) {
      this.setState({
        height: scrollHeight
      });
    }
  };

  onKeyDown = e => {
    const { onTextAreaClosed } = this.props;
    const { keyCode, shiftKey } = e;

    // If key is 'enter' and shift key is pressed
    if (keyCode === 13 && !shiftKey) {
      // End editing
      onTextAreaClosed();
    }

    // If key is 'esc'
    if (keyCode === 27) {
      // End editing
      onTextAreaClosed();
    }
  };

  render() {
    if (!document) {
      return;
    }
    const domNode = document.querySelector('#portal_container');
    if (!domNode) {
      return;
    }
    const { height } = this.state;
    const {
      style,
      maxWidth,
      maxHeight,
      onTextAreaClosed,
      onTextAreaChanged,
      ...restOfProps
    } = this.props;
    const { height: _, ...rest } = style;
    return ReactDOM.createPortal(
      <textarea
        autoFocus
        css={textaAreaStyle}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
        style={{
          ...rest,
          height,
          maxWeight: `${maxHeight}px`,
          maxWidth: `${maxWidth}px`
        }}
        {...restOfProps}
      />,
      domNode
    );
  }
}

export default EditTextArea;
