import React, { Component,PropTypes } from 'react'
import { connect } from 'react-redux'

import Header from '../../components/web/header/Header.jsx'
import Content from '../../components/web/content/Content.jsx'
import {bindingMixin} from 'gfs-react-redux-twoway-binding'
import * as IndexAction from '../../actions/index.es6'


@connect(state => ({
    home:state.home
}), IndexAction)
@bindingMixin
export default class Parcel extends Component {

    static propTypes = {
        children:PropTypes.object,
        home:PropTypes.any
    }

    constructor(props) {
        super(props)

        //this.props.query()

        this.setBinding('home')
    }

    static defaultProps={

    }

    setValueByReducers(key,value){
        this.manualChange(key,value)
    }

    bindPropsForElements(){
        let options = React.Children.map(this.props.children,(option)=>{

            let opt = React.cloneElement(option,{
                setValueByReducers:this.setValueByReducers
            })
            return opt

        },this)

        return options
    }
    shouldComponentUpdate(){return true}
    render() {

        const {home} = this.props

        return (
            <div>
                <Header {...this.props} setValueByReducers={::this.setValueByReducers} module={home.get('module') }  />
                <Content>
                    {this.bindPropsForElements() }
                </Content>
            </div>
        )
    }
}