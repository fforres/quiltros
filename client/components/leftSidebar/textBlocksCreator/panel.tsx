/** @jsx jsx */
import {
  Button,
  ButtonGroup,
  FormGroup,
  Icon,
  TextArea
} from '@blueprintjs/core';
import { jsx } from '@emotion/core';
import React from 'react';
import ColorSelector from '../colorSelector';

export interface ITextBlocksConfigPanelProps
  extends ITextBlocksConfigPanelState {
  isSelected: boolean;
  onChange: (arg1: ITextBlocksConfigPanelState) => void;
  onMouseDown: () => void;
}

export interface ITextBlocksConfigPanelState {
  id: string;
  text: string;
  fontSize: 'small' | 'medium' | 'large';
  color: 'black' | 'red' | 'green' | 'purple' | 'yellow' | 'white';
}

export default class TextBlocksConfigPanel extends React.Component<
  ITextBlocksConfigPanelProps
> {
  static colors = ['black', 'red', 'green', 'purple', 'yellow', 'white'];

  constructor(props) {
    super(props);
    this.state = {
      color: 'black',
      fontSize: 'medium',
      id: props.id,
      text: ''
    };
  }

  change = () => {
    this.props.onChange(this.state);
  };

  onMainTextChanged = e => {
    this.setState({ text: e.target.value }, this.change);
  };

  setHeight = fontSize => () => {
    this.setState({ fontSize }, this.change);
  };

  setSelectedColor = color => {
    this.setState({ color }, this.change);
  };

  render() {
    const { fontSize, color, onMouseDown, text } = this.props;
    return (
      <div onMouseDown={onMouseDown}>
        <FormGroup label="Texto">
          <TextArea
            fill
            growVertically
            name="Texto"
            onChange={this.onMainTextChanged}
          />
        </FormGroup>
        <FormGroup label="Tamaño">
          <ButtonGroup fill>
            <Button
              large
              active={fontSize === 'small'}
              onClick={this.setHeight('small')}
            >
              <Icon iconSize={10} icon="font" />
            </Button>
            <Button
              large
              active={fontSize === 'medium'}
              onClick={this.setHeight('medium')}
            >
              <Icon iconSize={16} icon="font" />
            </Button>
            <Button
              large
              active={fontSize === 'large'}
              onClick={this.setHeight('large')}
            >
              <Icon iconSize={24} icon="font" />
            </Button>
          </ButtonGroup>
        </FormGroup>
        <FormGroup label="Color">
          <ButtonGroup fill>
            {TextBlocksConfigPanel.colors.map(el => (
              <ColorSelector
                key={el}
                color={el}
                isActive={el === color}
                onColorClicked={this.setSelectedColor}
              />
            ))}
          </ButtonGroup>
        </FormGroup>
      </div>
    );
  }
}
