import React from 'react'
import { PictureModel } from './models';

const Picture = React.createClass({
  render() {
    let { location } = this.props;
    console.log(this.props);
    return (
        <div>
          <img src={location.state.cat.get('src')} style={{ height: '80%' }}/>
        </div>
    )
  }
});

export {Picture as default}
