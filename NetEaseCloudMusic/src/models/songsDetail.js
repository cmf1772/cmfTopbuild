import {getSongsDetail} from '../services/songsDetail'

export default {

    namespace: 'songsDetail',
  
    state: {

    },
  
    effects: {
      *getList({ payload }, { call, put }) {  // eslint-disable-line
        let res = yield call(getSongsDetail,payload)
        console.log('songsDetail...', res)
        yield put({ type: 'save' });
      },
    },
  
    reducers: {
      save(state, action) {
        return { ...state, ...action.payload };
      },
    },
  
  };
  