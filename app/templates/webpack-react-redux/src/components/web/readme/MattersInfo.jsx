//注意事项
import React, { Component} from 'react'
import {Row,Col,Panel,PanelHeader,PanelContent} from 'eagle-ui'

export default class MattersInfo extends Component {
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
                        <PanelHeader leftFlag>注意事项</PanelHeader>
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