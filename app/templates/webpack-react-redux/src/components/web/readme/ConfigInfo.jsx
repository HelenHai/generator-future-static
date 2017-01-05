//配置信息详解
import React, { Component } from 'react'
import {Row,Col,Panel,PanelHeader,PanelContent} from 'eagle-ui'

export default class ConfigInfo extends Component {
    constructor(props) {

        super(props)
    }

    static defaultProps={

    }
    shouldComponentUpdate(){return true}
    render() {
        return (
            <Row>
                <Col>
                    <Panel>
                        <PanelHeader leftFlag>配置文件详解</PanelHeader>
                        <PanelContent>
                            <Row>
                                <Col />
                            </Row>

                        </PanelContent>
                    </Panel>
                </Col>
            </Row>
        )
    }
}