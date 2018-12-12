import { getBanner, getTjgd } from '../services/anchor'

export default {

    namespace: 'anchor',

    state: {
        banners: [],
        result: []
    },

    effects: {
        *getBanner({ payload }, { call, put }) {  // eslint-disable-line
            let res = yield call(getBanner)
            // console.log('res...', res)
            yield put({
                type: "listBanner",
                payload: res.data
            })
        },
        *getTjgd({ payload }, { call, put }) {  // eslint-disable-line
            let res = yield call(getTjgd)
            console.log('res...', res.data)
            yield put({
                type: "listBanner",
                payload: res.data
            })
        },
    },

    reducers: {
        listBanner(state, action) {
            // console.log('action', action)
            return { ...state, ...action.payload };
        },
    },

};
