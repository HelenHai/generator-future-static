import React, { Component /*,PropTypes*/} from 'react'
import {Grid,Row,Col} from 'eagle-ui'

import Info from './Info.jsx'
import AccessInfo from './AccessInfo.jsx'
import MattersInfo from './MattersInfo.jsx'
import ConfigInfo from './ConfigInfo.jsx'
import CreatePcProjectInfo from './CreatePcProjectInfo.jsx'
import CreateWapProjectInfo from './CreateWapProjectInfo.jsx'
import DirInfo from './DirInfo.jsx'

import './Readme.less'

export default class Readme extends Component {
    constructor(props) {

        super(props)
    }

    static defaultProps={

    }
    shouldComponentUpdate(){return true}
    render() {
        return (
            <Grid fluid className="readme">
                <Row>
                    <Col>
                        <h3>webpack-react-redux-template使用说明<small>此脚手架用于快速搭建基于react开发的前端项目</small></h3>
                    </Col>
                </Row>

                {/**简介*/}
                <Info />

                {/**获取方式*/}
                <AccessInfo />

                {/**目录结构*/}
                <DirInfo />

                {/**配置文件详情*/}
                <ConfigInfo />

                {/**创建pc项目*/}
                <CreatePcProjectInfo />

                {/**创建wap项目*/}
                <CreateWapProjectInfo />
                {/**注意事项*/}
                <MattersInfo />

            </Grid>
        )
    }
}