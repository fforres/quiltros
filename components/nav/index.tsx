/** @jsx jsx */
import { jsx } from '@emotion/core';
import Link from 'next/link';
import React, { Component } from 'react';
import { navContainerStyle, ulStyle } from './styles';

class Nav extends Component {
  public render() {
    return (
      <nav css={navContainerStyle}>
        <ul css={ulStyle}>
          <li>logo</li>
          <li>-</li>
          <li>login</li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
