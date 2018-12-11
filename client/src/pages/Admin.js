import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import API from '../utils/API'
import DisplayLead from '../components/displayLead'
import './lead.css';


export default class Admin extends Component {
    constructor() {
        super()
        this.state = {
            results: [],
        }
    }

    componentWillMount() {
        API.getLeads().then(results => {
            this.setState({ results: results.data })
        })
    }

    render() {
        const leads = this.state.results.map(lead => <DisplayLead key={lead._id} data={lead} />)

        return (
            <Fragment>
                <Navbar />
                <div className="container">
                    <h2 className="display-4">Admin Page</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Status</th>
                                <th scope="col">Student First Name</th>
                                <th scope="col">Student Last Name</th>
                                <th scope="col">Parent First Name</th>
                                <th scope="col">Parent Last Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Class</th>
                                <th scope="col">Time</th>

                            </tr>
                        </thead>
                        <tbody>
                            {leads}
                        </tbody>
                    </table>


                </div >
            </Fragment>
        )
    }
}
