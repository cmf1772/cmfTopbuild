import React from 'react';
import Cookies from 'js-cookie'

class Index extends React.PureComponent{

  componentDidMount() {
    console.log(Cookies.get('auto_token'))
  }
  render() {
    return (
        <div>
          {this.props.match.path}
        </div>
      )
  }
}

export default Index;
