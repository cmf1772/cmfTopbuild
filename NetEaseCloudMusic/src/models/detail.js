import { detail, getUrl, getSearch, getLyric } from '../services/detail'
import Item from '../../node_modules/antd/lib/list/Item';
import { routerRedux } from 'dva/router';

export default {

    namespace: 'detail',

    state: {
        songs: [],
        url: '',
        info: {},
        result: {
            songs: []
        },
        detail: {},
        current: 0,
        id: 0,
        playList: JSON.parse(window.localStorage.getItem('playList')) || [],
        distiguishList: JSON.parse(window.localStorage.getItem('distiguishList')) || [],
    },

    effects: {
        *getdetail({ payload }, { call, put }) {  // eslint-disable-line
            let res = yield call(detail, payload)
            // console.log(res)
            yield put({
                type: "getDetailList",
                payload: res.data
            })
        },
        *getUrl({ payload }, { call, put }) {  // eslint-disable-line
            let res = yield call(getUrl, payload)
            // console.log('res...', )
            let obj = { info: res.data.data[0] };
            obj.id = payload;
            obj.url = res.data.data[0].url
            yield put({
                type: "getDetailList",
                payload: obj
            })
        },
        *getList({ payload }, { call, put }) {// eslint-disable-line
            let res = yield call(getSearch, payload)
            yield put({
                type: 'getDetailList',
                payload: res.data
            });
        },

        * getUrls({ payload }, { call, put }) {// eslint-disable-line
            console.log('payload', payload)
            let responses = yield call(getUrl, payload.join(','))
            let details = yield call(detail, payload.join(','))
            responses = responses.data.data;
            details = details.data.songs;
            let playList = [];
            details.forEach(item => {
                playList.push({
                    detail: item,
                    info: responses.filter(value => value.id == item.id)[0]
                })
            })
            window.localStorage.setItem('playList', JSON.stringify(playList));
            yield put({
                type: 'getDetailList',
                payload: { playList }
            })
        },
        // * getLyric({ payload }, { call, put }) {
        //     let lyric = yield call(getLyric, payload);
        //     yield put({
        //         type: 'getDetailList',
        //         payload: {
        //             lyric: lyric.data.lrc.lyric
        //         }
        //     })
        // },
        * distinguishSong({ payload }, { call, put }) {
            console.log('payload...', payload);
            let songList = [], ids = [];
            while (true) {
                let id = Math.floor(Math.random() * payload.length);
                if (ids.indexOf(payload[id]) == -1) {
                    ids.push(payload[id]);
                    if (ids.length == 10) {
                        break;
                    }
                }
            }
            let responses = yield call(getUrl, ids.join(','));
            let details = yield call(detail, ids.join(','));
            responses = responses.data.data;
            details = details.data.songs;
            details.forEach(item => {
                songList.push({
                    name: item,
                    url: responses.filter(value => value.id == item.id)[0].url
                })
            })

            console.log('songList', songList)
            yield put({
                type: 'getDetailList',
                payload: {
                    distiguishList: songList
                }
            })
            window.localStorage.setItem('distiguishList', JSON.stringify(songList));
            yield put(routerRedux.push({
                pathname: `/DistinguishPage`,
            }))
        }
    },

    reducers: {
        getDetailList(state, action) {
            // console.log('action...', action)
            return { ...state, ...action.payload };
        },
        changePlay(state, { payload }) {
            // console.log(payload,state)
            let newState = { ...state };
            if (!state.playList.length || state.mode == 1) {
                return newState;
            }
            if (state.mode == 2) {
                let index = Math.floor(Math.random() * (state.playList.length - 1));
                newState.current = index;
            } else {
                if (payload == 'prev') {
                    if (state.current == 0) {
                        newState.current = state.playList.length - 1;
                    } else {
                        newState.current--;
                    }
                } else {
                    if (state.current == state.playList.length - 1) {
                        newState.current = 0;
                    } else {
                        newState.current++;
                    }
                }
            }
            newState.songs = [];
            newState.id = state.playList[newState.current].info.id;
            newState.url = state.playList[newState.current].info.url;
            newState.info = state.playList[newState.current].info;
            newState.songs.push(state.playList[newState.current].detail);

            return newState;
        }
    },
};





