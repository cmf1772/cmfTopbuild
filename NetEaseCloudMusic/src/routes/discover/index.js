import React from 'react';


import Cookies from 'js-cookie'
import { connect } from 'dva'

@connect((state) => {
  return state
}, dispatch => {
  return {
    getUser: (payload) => {
          dispatch({
              type: 'discover/getUser',
              payload
          })
      },
  }
})

// /user/detail?uid=32953014
class Index extends React.PureComponent {
  componentDidMount() {
    let id = Cookies.get('auto_token');
    this.props.getUser(id)
  }
  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.match.path}
      </div>
    ) 
  }
}

export default Index;
