/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Fragment } from 'react';

import ContactInformation from './contactInformation';
import PetInformation from './petInformation';
import TextBlocksCreator from './textBlocksCreator';
import { ITextBlocksConfigPanelState } from './textBlocksCreator/panel';

export interface ILeftSidebarProps {
  onTextChanged: (arg1: ITextBlocksConfigPanelState) => void;
}

export default class LeftSidebar extends React.Component<
  ILeftSidebarProps,
  any
> {
  render() {
    const { onTextChanged } = this.props;
    return (
      <div>
        <PetInformation />
        <ContactInformation />
        <TextBlocksCreator onTextChanged={onTextChanged} />
      </div>
    );
  }
}
