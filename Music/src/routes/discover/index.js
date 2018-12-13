import React from 'react';
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
