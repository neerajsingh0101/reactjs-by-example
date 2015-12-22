import React from 'react'
import { PictureModel } from './models';

const Picture = React.createClass({
  render() {
    let { location } = this.props;
    let cat  = location.state.cat;
    console.log(this.props);
    return (
        <div>
          <img src={cat.get('src')} style={{ height: '80%' }}/>
          <h3 style={{float:'right'}}>Name: {cat.get('name')}.</h3>
          <p style={{float:'right'}}>Details: {cat.get('details')} </p>
        </div>
    )
  }
});

export {Picture as default}
