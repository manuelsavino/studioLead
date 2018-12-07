import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default class Admin extends Component {
    render() {
        return (
            <div>
                <Navbar />

                <h2> Admin Page</h2>
                <Link to={'/addAClass'}><h3>Add a class </h3></Link>
            </div >
        )
    }
}
