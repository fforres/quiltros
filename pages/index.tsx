import React from 'react';
import Canvas from '../components/canvas';
import Head from '../components/head';
import Nav from '../components/nav';

interface IHomeState {
  canvasImage: HTMLImageElement | null;
}

class Home extends React.PureComponent<any, IHomeState> {
  state = {
    canvasImage: null
  };

  setCanvasImage = (image: HTMLImageElement) => {
    this.setState({
      canvasImage: image
    });
  };

  render() {
    const { canvasImage } = this.state;

    return (
      <div>
        <Head title='Home' />
        <Nav onImageUploaded={this.setCanvasImage} />
        <section data-name='bodycontainer'>
          <Canvas image={canvasImage} />
        </section>
      </div>
    );
  }
}

export default Home;
