import { actionType } from '../constants/action-type.es6'

import RTools from 'gfs-react-tools'

const fetch = RTools.fetch

export function query() {
    return dispatch => {

        fetch('/test').then(function(data) {

            dispatch({
                type: actionType.QUERY,
                data: data
            })
        }).then(() => {
            window.console.dir('test fetch for promise')
        }).then(() => {
            window.console.dir('callback')
        }, (xhr) => {
            window.console.dir(xhr)
        })
    }
}

export function getModuleList(key) {

    return async() => {

        let data = await fetch('/search')
        if (data.status == 200) {

            let str = JSON.stringify(data.msg.searchList)
            let reg = new RegExp('([^[},]*\{+"key":"[^"]*' + key + '[^"]*".+?\})', 'gi')

            str = str.match(reg)

            data = str ? str : []

            return data
        }

        return []

    }
}