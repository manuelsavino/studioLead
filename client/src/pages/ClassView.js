import React, { Component } from 'react'

export default class ClassView extends Component {

    render(){
        return <p>{this.props.match.params.id}</p>;
    }
}