import React from 'react'
import { PictureModel } from './models';

const Picture = React.createClass({
  render() {
    let { location } = this.props;
    let cat = location.state.cat;
    console.log(this.props);
    return (
        <div>
          <div style={{ float: 'left', width: '40%' }}>
            <img src={cat.get('src')} style={{ height: '80%' }}/>
          </div>
          <div style={{ float: 'left', width: '60%' }}>
            <h3>Name: {cat.get('name')}.</h3>
            <p>Details: {cat.get('details')} </p>
          </div>
        </div>
    )
  }
});

export {Picture as default}
