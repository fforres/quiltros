import { IconName, IconSvgPaths16 } from '@blueprintjs/icons';
import * as React from 'react';

export interface IIconProps {
  iconName: keyof Record<IconName, string[]>;
  size: number;
  style: object;
  color: string;
}

class Icon extends React.Component<IIconProps, any> {
  static defaultProps = {
    color: 'grey',
    size: 16,
    style: {}
  };

  renderSvgPaths = () => {
    const { iconName } = this.props;
    const pathStrings = IconSvgPaths16[iconName];
    if (!pathStrings) {
      return null;
    }
    return pathStrings.map((d, i) => <path key={i} d={d} fillRule='evenodd' />);
  };

  render() {
    const { iconName, size, style, color, ...svgProps } = this.props;
    const pixelGridSize = 16;
    const viewBox = `0 0 ${pixelGridSize} ${pixelGridSize}`;
    const paths = this.renderSvgPaths();
    const svgStyle = { ...style, fill: color };
    if (!paths) {
      return null;
    }
    return (
      <svg
        viewBox={viewBox}
        width={size}
        height={size}
        style={svgStyle}
        {...svgProps}
      >
        {paths}
      </svg>
    );
  }
}

export default Icon;
