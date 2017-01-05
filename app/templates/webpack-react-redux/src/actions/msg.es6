//import { actionType } from '../constants/action-type.es6'

import RTools from 'gfs-react-tools'

export function save(callback) {

    return ( /*dispatch*/ ) => {

        RTools.fetch('/msg/save').then(function(data) {

            if (data.status == 200) {
                callback()
            }
        })
    }
}