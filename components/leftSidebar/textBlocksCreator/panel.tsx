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
import { hiddenStyle, shownStyle } from './style';

export interface ITextBlocksConfigPanelProps {
  shown: boolean;
  id: string;
  onChange: (arg1: ITextBlocksConfigPanelState) => void;
}

export interface ITextBlocksConfigPanelState {
  id: string;
  text: string;
  fontSize: string;
  color: string;
  borderColor: string;
}

export default class TextBlocksConfigPanel extends React.Component<
  ITextBlocksConfigPanelProps,
  ITextBlocksConfigPanelState
> {
  static colors = ['white', 'black', 'red', 'green', 'purple', 'yellow'];

  constructor(props) {
    super(props);
    this.state = {
      borderColor: 'black',
      color: 'white',
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
    const { shown } = this.props;
    const { fontSize, color } = this.state;
    return (
      <div css={[hiddenStyle, shown && shownStyle]}>
        <FormGroup label='Texto'>
          <TextArea
            fill={true}
            growVertically={true}
            name='Texto'
            onChange={this.onMainTextChanged}
          />
        </FormGroup>
        <FormGroup label='Tamaño'>
          <ButtonGroup fill={true}>
            <Button
              large={true}
              active={fontSize === 'small'}
              onClick={this.setHeight('small')}
            >
              <Icon iconSize={10} icon='font' />
            </Button>
            <Button
              large={true}
              active={fontSize === 'medium'}
              onClick={this.setHeight('medium')}
            >
              <Icon iconSize={16} icon='font' />
            </Button>
            <Button
              large={true}
              active={fontSize === 'large'}
              onClick={this.setHeight('large')}
            >
              <Icon iconSize={24} icon='font' />
            </Button>
          </ButtonGroup>
        </FormGroup>
        <FormGroup label='Color'>
          <ButtonGroup fill={true}>
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
