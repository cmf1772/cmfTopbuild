import React from 'react';
import {connect} from 'dva'

@connect(state => {
  return {

  }
}, dispatch => {
  return {
    getListDetail: payload => {
      dispatch({
        type: 'songsDetail/getList',
        payload
      })
    }
  }
})
class Index extends React.PureComponent{
  
  componentDidMount() {
    this.props.getListDetail(this.props.match.params.id)
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
