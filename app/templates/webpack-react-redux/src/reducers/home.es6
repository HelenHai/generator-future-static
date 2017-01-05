import Immutable from 'immutable'
import { createReducer } from 'gfs-react-redux-twoway-binding'
import { actionType } from '../constants/action-type'

const initialState = Immutable.fromJS({
    name: 'init',
    module: {
        url: '',
        val: '',
        key: ''
    }
})

export const home = createReducer('home', initialState, {
    [actionType.QUERY]: (data, action) => {
        return data.merge(Immutable.fromJS(action.data))
    }
})