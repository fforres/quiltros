/** @jsx jsx */
import {
  Button,
  ButtonGroup,
  Card,
  Elevation,
  FormGroup,
  H4
} from '@blueprintjs/core';
import { jsx } from '@emotion/core';
import React from 'react';
import TextBlocksConfigPanel, { ITextBlocksConfigPanelState } from './panel';
import { customButtonStyle, sidebarContainerStyle } from './style';

export interface ITextBlocksCreatorProps {
  onTextChanged: (arg1: ITextBlocksConfigPanelState) => void;
}

export default class TextBlocksCreator extends React.Component<
  ITextBlocksCreatorProps,
  any
> {
  static buttonsKeys = ['alignment-top', 'align-center', 'alignment-bottom'];
  state = {
    selected: 'alignment-top'
  };
  onButtonClicked = key => {
    this.setState({ selected: key });
  };

  renderPanel = () => {
    return <p>asdasd</p>;
  };

  getOnButtonClicked = key => () => this.onButtonClicked(key);

  render() {
    const { selected } = this.state;
    const { onTextChanged } = this.props;
    return (
      <Card elevation={Elevation.ONE} css={sidebarContainerStyle}>
        <H4>Agregar Texto</H4>
        <FormGroup>
          <ButtonGroup fill={true} large={true}>
            {TextBlocksCreator.buttonsKeys.map(key => {
              return (
                <Button
                  icon={key as any}
                  key={key}
                  css={customButtonStyle}
                  active={selected === key}
                  onClick={this.getOnButtonClicked(key)}
                />
              );
            })}
          </ButtonGroup>
        </FormGroup>
        {TextBlocksCreator.buttonsKeys.map(key => {
          return (
            <TextBlocksConfigPanel
              key={key}
              id={key}
              onChange={onTextChanged}
              shown={selected === key}
            />
          );
        })}
      </Card>
    );
  }
}
