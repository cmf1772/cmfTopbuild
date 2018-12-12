import React from 'react';
import {connect} from 'dva';
import {randomArr} from '../../utils/index';
import styles from './DistinguishPage.scss';

@connect(({play})=>{
  return play
}, dispatch=>{
  return {

  }
})
class Distinguish extends React.PureComponent{
  constructor(){
    super();
    this.state = {
      rightAnser: [],
      answers: new Array(10), 
      answerList: [], 
      current: 0, 
      isPlay: false,
      progress: 0,  
      tempTime: {   
        start: 0,
        end: 0
      }
    }
  }

  static getDerivedStateFromProps(props, state){
    return {
      rightAnser: props.distiguishList.map(item=>item.name.name)
    }
  }

  randomAnswer(){
    this.setState({
      answerList: randomArr(this.state.rightAnser)
    })
  }

  componentDidMount(){
    this.randomAnswer();
  }

  startPlay(){
    console.log('e...开始播放', this.refs.audio.duration);
    let start = Math.floor(Math.random()*(this.refs.audio.duration-10));
    this.setState({
      tempTime: {
        start,
        end: start+10
      }
    }, ()=>{
      [...document.querySelectorAll('ul button')].forEach(item=>{
        item.className = item.className.replace(' error', '').replace(' success', '');
      })
      this.refs.audio.pause();
      this.refs.audio.currentTime = start;
      this.refs.audio.play();
    })
  }

  timeUpdate(){
    if (this.refs.audio.currentTime > this.state.tempTime.end){
      this.refs.audio.pause();
      if (this.state.current == 9){
        console.log('this.answers...', this.state.answers);
      }else{
        this.setState({
          current: (this.state.current+1)%10
        }, ()=>{
          this.refs.audio.play();
        })
      }
    }
    this.setState({
      progress: Math.floor((this.refs.audio.currentTime - this.state.tempTime.start)/10*100)
    })
  }

  get currentTime(){
    if (this.refs.audio && this.refs.audio.currentTime){
      return (Math.floor((this.refs.audio.currentTime - this.state.tempTime.start))+'').padStart(2, '0');
    }
    return '00';
  }

  play(){
    this.setState({
      isPlay: !this.state.isPlay
    }, ()=>{
      this.state.isPlay?this.refs.audio.play():this.refs.audio.pause();
    })
  }

  answer(e){
    if (this.state.answers[this.state.current]){
      return;
    }
    if (e.target != e.currentTarget){
      let answer = e.target.innerText;
      let answers = [...this.state.answers];
      answers[this.state.current] = answer;
      this.setState({
        answers
      })
      if (this.state.rightAnser[this.state.current] == answer){
        e.target.className += ' success';
      }else{
        e.target.className += ' error';
      }
    }
  }

  render(){
    return <React.Fragment>
      <h2>猜歌名</h2>
      <ul onClick={this.answer.bind(this)}>{this.state.answerList.map((item)=>{
        return <button className={styles.answer} key={item}>{item}</button>
      })}</ul>
      <div>
        <span>{'00.'+this.currentTime}</span>
        <div className={styles.progress}>
          <p ref="progress">
            <span style={{width:this.state.progress+'%'}}></span>
          </p>
        </div>
        <span>00.10</span>
      </div>
      <button onClick={this.play.bind(this)}>{this.state.isPlay?'暂停':'播放'}</button>
      <span>{`${this.state.current+1}/10`}</span>
      <audio crossOrigin="anonymous" src={this.props.distiguishList[this.state.current].url} ref="audio"
        onTimeUpdate={()=>this.timeUpdate()}
        onLoadedMetadata={()=>this.startPlay()}></audio>
      <ul className={styles.list}>
        <h2>猜歌结果</h2>
        {this.state.answers.map((item, index)=>{
          return <li>
            <span>{index+1}</span>
            <span>答案：{item}</span>
            <span>{item == this.state.rightAnser[index]?'猜对':'猜错'}</span>
          </li>
        })}
      </ul>
    </React.Fragment>;
  }
}

export default Distinguish;
