/** @jsx jsx */
import { Card, Elevation } from '@blueprintjs/core';
import { jsx } from '@emotion/core';
import React from 'react';
import { sidebarContainerStyle } from './style';

export interface ILeftSidebarProps {}

export default class LeftSidebar extends React.Component<
  ILeftSidebarProps,
  any
> {
  render() {
    return (
      <Card elevation={Elevation.ONE} css={sidebarContainerStyle}>
        <h1>asdads</h1>
        <p>qwe</p>
      </Card>
    );
  }
}
