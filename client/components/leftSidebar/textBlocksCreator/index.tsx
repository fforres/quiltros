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
  onAddTextBlockClicked: () => void;
  onTextBlockInteracted: (key: string) => void;
  selectedTextBlock: string;
  textBlocks: {
    [id: string]: ITextBlocksConfigPanelState;
  };
  formValues: IAdoptionForm;
}

export default class TextBlocksCreator extends React.Component<
  ITextBlocksCreatorProps,
  any
> {
  static buttonsKeys = ['alignment-top', 'align-center', 'alignment-bottom'];
  onTextBlockChanged = (e, key) => {
    const { onTextChanged, onTextBlockInteracted } = this.props;
    onTextBlockInteracted(key);
    onTextChanged(e);
  };

  render() {
    const {
      selectedTextBlock,
      onAddTextBlockClicked,
      onTextBlockInteracted,
      textBlocks
    } = this.props;
    return (
      <Card elevation={Elevation.ONE} css={sidebarContainerStyle}>
        <FormGroup>
          <H4>
            Agregar Texto <Button icon="plus" onClick={onAddTextBlockClicked} />
          </H4>
        </FormGroup>
        {Object.values(textBlocks).map(textBlock => (
          <TextBlocksConfigPanel
            key={textBlock.id}
            {...textBlock}
            onMouseDown={() => onTextBlockInteracted(textBlock.id)}
            onChange={e => this.onTextBlockChanged(e, textBlock)}
            isSelected={selectedTextBlock === textBlock.id}
          />
        ))}
      </Card>
    );
  }
}
