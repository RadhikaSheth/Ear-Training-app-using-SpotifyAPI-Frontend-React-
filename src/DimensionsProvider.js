import React from 'react';
import Dimensions from 'react-dimensions';

class DimensionsProvider extends React.Component {
  render() {
    return (
      <div>
        {this.props.children({
          containerWidth: 450,
          containerHeight: 65,
        })}
      </div>
    );
  }
}

export default Dimensions()(DimensionsProvider);
