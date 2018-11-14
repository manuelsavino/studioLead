import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

export default class Admin extends Component {
    render() {
        return (
            <div>
                <h2>Admin Page</h2>
                <Link to={'/addAClass'}><h3>Add a class </h3></Link>
            </div >
        )
    }
}
