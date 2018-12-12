import { routerRedux } 　from 'dva/router'
import {discover} from '../services/discover'

export default {

    namespace: 'discover',

    state: {},

    effects: {
        *getUser({ payload }, { call, put }) {  // eslint-disable-line
            let response = yield call(discover, payload)
            console.log(response)
            yield  put({
                type: 'uodatastate',
                payload:response.data
            })
        },
    },

    reducers: {
        uodatastate(state, action) {
            return { ...state, ...action.payload };
        },
    },
};
