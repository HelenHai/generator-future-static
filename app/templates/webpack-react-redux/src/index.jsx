/**
 * 主程序入口
 */
import React, { Component} from 'react'

import * as reducers from './reducers/index.es6'

import { Redirect, Router, Route } from 'react-router'
import History from 'history/lib/createHashHistory'

import Index from './containers/web/Index.jsx'
import Msg from './containers/web/Msg.jsx'

import RTools from 'gfs-react-tools'

class AppRouter extends Component {

    constructor(props) {
        super(props)
        // Opt-out of persistent state, not recommended.
        this.history = new History({
            queryKey: false
        })
    }

    static defaultProps={

    }

    /**
     * 页面路由总览，children为外接做入口，外接入口即为AppRouter
     * @returns {XML}
     */
    render() {
        return (
            <div>
                <Router history={this.history}>
                    <Route path="/index" component={Index} />
                    <Route path="/msg" component={Msg} />
                    <Redirect from="/" to="/index" />
                </Router>
            </div>
        )
    }
}

new RTools({
     //可选
    //middleware:[],
    //必填
    module:AppRouter,
    //可选
    reducers:reducers,
    //可选
    //devTools:DevTools,
    //可选 默认loadingbarComponent
    //bar:null,
    //可选  loadingbar平台（pc/wap/other）other直接使用bar字段作为参数
    agent:'pc'//,
    //可选  react component放取的节点id
    //container:'root'
})