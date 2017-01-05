/**
 * APP主程序入口
 */
// import React, { Component ,PropTypes} from 'react'
// import {render} from "react-dom"
import RTools from 'gfs-react-tools'

import Index from '../containers/web/Index.jsx'
import * as reducers from '../reducers/index.es6'

//判断执行dev环境
new RTools({
     //可选
    middleware:[],
    //必填
    module:Index,
    //可选
    reducers:reducers,
    //可选
    //devTools:DevTools,
    //可选 默认loadingbarComponent
    //bar:null,
    //可选  loadingbar平台（pc/wap/other）other直接使用bar字段作为参数
    agent:'pc',
    //可选  react component放取的节点id
    container:'root'
})