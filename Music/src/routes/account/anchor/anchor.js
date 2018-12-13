import React from 'react'
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import style from './anchor.scss'
import { connect } from 'dva'

@connect(({ anchor }) => {
    return anchor
}, dispatch => {
    return {
        getBanner: () => {
            dispatch({
                type: 'anchor/getBanner'
            })
        },
        getTjgd: () => {
            dispatch({
                type: 'anchor/getTjgd'
            })
        }
    }
})

class Anchor extends React.PureComponent {

    componentDidMount() {
        this.props.getBanner();
        this.props.getTjgd()
    }
    render() {
        let {
            banners,
            result
        } = this.props
        // console.log(this.props)
        return (
            <div>
                <div className="autoChange">
                    <Carousel autoplay>
                        {
                            banners.map((item, ind) => {
                                return <div key={ind}>
                                    <h3><img src={item.imageUrl} /></h3>
                                </div>
                            })
                        }
                    </Carousel>
                </div>
                <div className="banner">
                    <dl>
                        <dd></dd>
                        <dt>私人FM</dt>
                    </dl>
                    <dl>
                        <dd></dd>
                        <dt>每日推荐</dt>
                    </dl>
                    <dl>
                        <dd></dd>
                        <dt>歌单</dt>
                    </dl>
                    <dl>
                        <dd></dd>
                        <dt>排行榜</dt>
                    </dl>
                </div>
                <div className="content">
                    <h4>推荐歌单></h4>
                    <div className="content-item">
                        {
                            result.map((item, index) => {
                                if (index < 6) {
                                    return <div className="item" key={index}>
                                            <img src={item.picUrl} />
                                            <p>{item.name}</p>
                                    </div>
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Anchor