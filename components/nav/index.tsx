/** @jsx jsx */
import { Alignment, Button, Navbar } from '@blueprintjs/core';
import { jsx } from '@emotion/core';
import React, { Component, createRef } from 'react';
import { fileUpload, navContainerStyle } from './styles';

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
      <Navbar css={navContainerStyle}>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Quiltro</Navbar.Heading>
          <Navbar.Divider />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <Navbar.Divider />
          <Button
            intent='primary'
            rightIcon='upload'
            text='Subir Imagen'
            onClick={this.openFile}
          />
          <input
            ref={this.inputFileRef}
            onChange={this.onFileUploaded}
            type='file'
            css={fileUpload}
          />
        </Navbar.Group>
      </Navbar>
    );
  }
}

export default Nav;
