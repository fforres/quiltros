import { Button, Icon } from '@blueprintjs/core';
import * as React from 'react';

export interface IColorSelectorProps {
  isActive: boolean;
  color: string;
  onColorClicked: (attr1: string) => void;
}

class ColorSelector extends React.Component<IColorSelectorProps, any> {
  onClick = () => {
    const { onColorClicked, color } = this.props;
    onColorClicked(color);
  };

  render() {
    const { isActive, color } = this.props;
    return (
      <Button large active={isActive} onClick={this.onClick}>
        <Icon iconSize={24} icon="symbol-square" color={color} />
      </Button>
    );
  }
}

export default ColorSelector;
