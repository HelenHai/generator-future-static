import React, { Component /*,PropTypes*/} from 'react'
import { connect } from 'react-redux'
import {Dialog} from 'eagle-ui'

import Readme from '../../components/web/readme/Readme.jsx'
import * as IndexAction from '../../actions/index.es6'
import {bindingMixin} from 'gfs-react-redux-twoway-binding'

import Parcel from './Parcel.jsx'


@connect(state => ({
    home: state.home
}), IndexAction)

@bindingMixin
export default class Index extends Component {
    constructor(props) {
        super(props)

        this.setBinding('home')
    }
    shouldComponentUpdate(){return true}
    componentDidMount(){
        Dialog.alert('请使用webpack-react脚手架，更便捷的开发体验')
    }
    render() {

        return (
            <Parcel>
                <Readme />
            </Parcel>
        )
    }
}