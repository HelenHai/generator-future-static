//创建pc项目
import React, { Component } from 'react'
import {Row,Col,Panel,PanelHeader,PanelContent} from 'eagle-ui'

export default class CreatePcProjectInfo extends Component {
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
                        <PanelHeader leftFlag>创建pc项目</PanelHeader>
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