//创建wap项目
import React, { Component } from 'react'
import {Row,Col,Panel,PanelHeader,PanelContent} from 'eagle-ui'

export default class CreateWapProjectInfo extends Component {
    constructor(props) {

        super(props)
    }
    shouldComponentUpdate(){return true}
    render() {
        return (
            <Row>
                <Col>
                    <Panel>
                        <PanelHeader leftFlag>创建wap项目</PanelHeader>
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