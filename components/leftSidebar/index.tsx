/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { Fragment } from 'react';

import PetInformation from './petInformation';

export interface ILeftSidebarProps {}

export default class LeftSidebar extends React.Component<
  ILeftSidebarProps,
  any
> {
  render() {
    return (
      <Fragment>
        <PetInformation />
      </Fragment>
    );
  }
}
