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
import { IAdoptionForm } from '../../../../pages';
import TextBlocksConfigPanel, { ITextBlocksConfigPanelState } from './panel';
import { customButtonStyle, sidebarContainerStyle } from './style';

export interface ITextBlocksCreatorProps {
  onTextChanged: (arg1: ITextBlocksConfigPanelState) => void;
  onChange: (key: keyof IAdoptionForm, value: any) => void;
  onMainTextButtonPressed: (key: number) => void;
  selectedTextBlock: string;
  formValues: IAdoptionForm;
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
    // this.setState({ selected: key });
    this.props.onMainTextButtonPressed(key);
  };

  renderPanel = () => {
    return <p>asdasd</p>;
  };

  onTextBlockChanged = (e, key) => {
    const { onTextChanged, onMainTextButtonPressed } = this.props;
    onMainTextButtonPressed(key);
    onTextChanged(e);
  };

  render() {
    const { selected } = this.state;
    const { selectedTextBlock } = this.props;
    return (
      <Card elevation={Elevation.ONE} css={sidebarContainerStyle}>
        <H4>Agregar Texto</H4>
        <FormGroup>
          <ButtonGroup fill large>
            {TextBlocksCreator.buttonsKeys.map(key => (
              <Button
                icon={key as any}
                key={key}
                css={customButtonStyle}
                active={selectedTextBlock === key}
                onClick={() => this.onButtonClicked(key)}
              />
            ))}
          </ButtonGroup>
        </FormGroup>
        {TextBlocksCreator.buttonsKeys.map(key => (
          <TextBlocksConfigPanel
            key={key}
            id={key}
            onChange={e => this.onTextBlockChanged(e, key)}
            shown={selectedTextBlock === key}
          />
        ))}
      </Card>
    );
  }
}
