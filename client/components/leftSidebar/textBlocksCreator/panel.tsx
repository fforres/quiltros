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
  onChange: (key: string, value: string, id: string) => void;
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

  componentWillReceiveProps(nextProps: ITextBlocksConfigPanelProps) {
    this.setState({
      ...this.state,
      ...nextProps
    });
  }

  onMainTextChanged = e => {
    const { onChange, id } = this.props;
    onChange('text', e.target.value, id);
  };

  setHeight = fontSize => () => {
    const { onChange, id } = this.props;
    onChange('fontSize', fontSize, id);
  };

  setSelectedColor = color => {
    const { onChange, id } = this.props;
    onChange('color', color, id);
  };

  render() {
    const { fontSize, color, onMouseDown, text, ...rest } = this.props;
    return (
      <section onMouseDown={onMouseDown}>
        <FormGroup label="Texto">
          <TextArea
            fill
            growVertically
            name="Texto"
            value={text}
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
      </section>
    );
  }
}
