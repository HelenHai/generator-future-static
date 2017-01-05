import React, { Component ,PropTypes} from 'react'
import './Content.less'

/***
 *
 * 主内容区域
 */
export default class Content extends Component {
    constructor(props) {

        super(props)
    }

    static propTypes = {
        children:PropTypes.any

    }

    static defaultProps={

    }
    shouldComponentUpdate(){return true}
    render() {
        return (
            <div className="content">
                {this.props.children}
            </div>
        )
    }
}