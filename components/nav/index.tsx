/** @jsx jsx */
import { Button, Card, Elevation } from '@blueprintjs/core';
import { jsx } from '@emotion/core';
import React, { Component, createRef } from 'react';
// import { Card, Elevation } from "@blueprintjs/core";
import Icon from '../icon';
import { buttonStyle, fileUpload, navContainerStyle, ulStyle } from './styles';

interface INavProps {
  onImageUploaded: (prop1: HTMLImageElement) => void;
}
class Nav extends Component<INavProps> {
  private inputFileRef = createRef<HTMLInputElement>();

  openFile = () => {
    this.inputFileRef.current!.click();
  };

  loadImageOntoReader = event => {
    const img = new Image();
    img.src = event.target.result;
    img.addEventListener('load', () => {
      this.props.onImageUploaded(img);
    });
  };

  onFileUploaded = e => {
    const reader = new FileReader();
    reader.onload = this.loadImageOntoReader;
    const file = e.target.files[0];
    if (!file) {
      console.error('!file', file, e);
    }
    reader.readAsDataURL(e.target.files[0]);
  };

  render() {
    return (
      <nav>
        <Card css={navContainerStyle}>
          <ul css={ulStyle}>
            <li />
            <Button
              icon='upload'
              intent='primary'
              rightIcon='caret-down'
              text='Upload image'
              onClick={this.openFile}
            />
            <input
              ref={this.inputFileRef}
              onChange={this.onFileUploaded}
              type='file'
              css={fileUpload}
            />
            <li />
          </ul>
        </Card>
      </nav>
    );
  }
}

export default Nav;
