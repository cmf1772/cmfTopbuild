import React from 'react';
import { connect } from 'dva';
import style from './detail.scss'
import { formatTime } from '../utils/time'
import Lyric from '../components/play/ci';

@connect(({ detail }) => {
  return detail
}, dispatch => {
  return {
    getDetail: payload => {
      dispatch({
        type: 'detail/getdetail',
        payload
      })
    },
    getUrl: payload => {
      dispatch({
        type: 'detail/getUrl',
        payload
      })
    },
    getListDetail: payload => {
      dispatch({
        type: 'detail/changePlay',
        payload
      })
    },
    changeLyric: payload=>{
      dispatch({
        type: 'detail/getLyric',
        payload
      })
    }
  }
})

class Detail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = ({
      currentTime: '',
      duration: '',
      progress: '',
      isplay: true,
      flag:true
    })
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    this.props.getDetail(id)
    this.props.getUrl(id)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.id != this.props.id){
      this.props.changeLyric(nextProps.id);
    }
  }

  timeChange() {
    let progress = this.refs.audio.currentTime / this.refs.audio.duration * 100
    this.setState({
      progress
    }, ()=>{
      if (this.state.progress == 100){
        this.props.getListDetail('next');
        if (!this.props.playList.length){
          this.refs.audio.pause();
          this.refs.audio.currentTime = 0;
          this.refs.audio.play();
        }
      }
    })
  }

  currentTime() {
    if (this.refs.audio && this.refs.audio.currentTime) {
      return formatTime(this.refs.audio.currentTime)
    }
    return '00:00'
  }

  duration() {
    if (this.refs.audio && this.refs.audio.duration) {
      return formatTime(this.refs.audio.duration)
    }
    return '00:00'
  }

  changePlay() {
    this.setState({
      isplay: !this.state.isplay
    }, () => {
      this.state.isplay ? this.refs.audio.play() : this.refs.audio.pause()
    })
  }

  touchStart() {
    this.setState({
      isplay: false
    }, () => {
      this.refs.audio.pause()
    })
  }

  touChMove(e) {
    // console.log('触发',e)
    let touch = e.touches[0],
      progressle = this.refs.progress;
    // console.log(progressle)
    // console.log(progressEle.offsetWidth) 
    let progress = (touch.pageX - progressle.offsetLeft) / progressle.offsetWidth;
    // console.log(progress)
    if (progress > 1) {
      progress = 1
    }
    if (progress < 0) {
      progress = 0
    }

    this.setState({
      progress: progress * 100
    }, () => {
      this.refs.audio.currentTime = progress * this.refs.audio.duration
    })
  }

  touchEnd() {
    this.setState({
      isplay: true
    }, () => {
      this.refs.audio.play()
    })
  }

  changeMuse(tyle) {
    this.props.getListDetail(tyle)
  }

  showList() {
    this.setState({
      flag: !this.state.flag
    })
  }

  render() {
    // console.log(this.props)
    let {
      songs,
      url,
      result
    } = this.props;
    // console.log(result.songs)
    // console.log('songs...',this.props.songs)
    // console.log(this.props)
    return (
      <div className='detailPage'>
        <div className="detail-top">
          {
            this.props.songs.map((item, index) => {
              return <div key={index} className="top-comtent">
                <img src={item.al.picUrl} />
                <h5>{item.name}</h5>
                <p>{item.al.name}></p>
              </div>
            })
          }
        </div>
        {/* <div>
        <Lyric lyric={this.props.lyric} currentTime={this.refs.audio && this.refs.audio.currentTime}/>
        </div> */}
        <div className="center-content">
          <span>{this.currentTime()}</span>
          <div className="streak"
            onTouchStart={() => { this.touchStart() }}
            onTouchMove={(e) => { this.touChMove(e) }}
            onTouchEnd={() => { this.touchEnd() }}
            ref="progress"
          >
            <p className="red" style={{ width: this.state.progress + '%' }}></p>
          </div>
          <span>{this.duration()}</span>
        </div>
        <div className="footer">
          <div onClick={() => {
            this.changeMuse('prev')
          }}>上一首</div>
          <div className="center">
            <div show='true' onClick={() => {
              this.changePlay()
            }}>{this.state.isplay ? '暂停' : '播放'}</div>
          </div>
          <div onClick={() => {
            this.changeMuse('next')
          }}>下一首</div>
        </div>
        <div onClick={() => {
            this.showList()
          }}>
          列表
        </div>
        {url ? <audio src={url} autoPlay ref="audio" onTimeUpdate={() => this.timeChange() }></audio> : null}
        <div className="wrap-list" hidden={this.state.flag}>
          <ul>{
            this.props.playList.map((item, index) => {
              return <li key={index}>
                <img src={item.detail.al.picUrl} />
                <div>
                  <p>{item.detail.name}</p>
                  <p>{`${item.detail.al.name}`}</p>
                </div>
              </li>
            })
          }</ul>
        </div>
      </div>
    )
  }
}

export default Detail;
