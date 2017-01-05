//目录结构
import React, { Component } from 'react'
import {Row,Col,Panel,PanelHeader,PanelContent} from 'eagle-ui'

export default class DirInfo extends Component {
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
                        <PanelHeader leftFlag>目录结构</PanelHeader>
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