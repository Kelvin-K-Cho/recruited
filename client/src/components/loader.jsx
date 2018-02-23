import React from 'react';
import { BarLoader } from 'react-spinners';

class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      width: 500,
      height: 30
    };
  }
  render() {
    return (
      <div className='pac-loading'>
        <BarLoader
          color={'#123abc'}
          loading={this.state.loading}
          height={this.state.height}
          width={this.state.width}
        />
      </div>
    );
  }
}

export default Bar;
