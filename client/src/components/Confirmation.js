import React, { Component } from 'react'
import moment from 'moment'

export default class Confirmation extends Component {
    continue = e => {
        e.preventDefault()
        this.props.nextStep();

    }
    previousStep = e => {
        e.preventDefault()
        this.props.previousStep();
    }

    handleSubmit = e => {
        e.preventDefault()
    }

    render() {
        return <div className="container">
            <div className="text-center">
                <ul id="progressbar">
                    <li> Parent Information</li>
                    <li>Child's Information</li>
                    <li>Choose a Class</li>
                    <li>Pick a date</li>
                    <li className="active">Confirm</li>
                    <li>Done</li>
                </ul>
            </div>

            <div className="card">
                <div className="card-body">
                    <h2 className="display-4 sortaBlack">Everything look ok?</h2>
                    <p className="text-muted">Take a moment and double check all is correct</p>


                    <div className="card w-50">
                        <div className="card-body">
                            <h3 className="card-title sortaBlack">Names &  Contact Information</h3>

                            <h4>Child's Name: <span className="text-muted">{this.props.info.cFirstName}  {this.props.info.cLastName}</span></h4>
                            <h4>Parent's Name: <span className="text-muted">{this.props.info.pFirstName}  {this.props.info.pLastName}</span></h4>
                            <h4>Cell Phone:<span className="text-muted"> {this.props.info.cellPhone}</span></h4>
                            <h4>Email:<span className="text-muted"> {this.props.info.emailAddress}</span></h4>
                        </div>
                    </div>
                    <div className="card w-50 mt-2">
                        <div className="card-body">
                            <h3 className="card-title sortaBlack">Class Information</h3>
                            <h4>Class: <span className="text-muted">{this.props.info.nameOfClass}</span></h4>
                            <h4>
                                Trial Date:
                                <span className="text-muted">{moment(this.props.info.date, "MM/DD/YYYY").format("dddd, MMMM Do YYYY")}</span>
                            </h4>
                            <h4>Time: <span className="text-muted">{moment(this.props.info.time, "HH:mm").format("h:mm A")}</span></h4>
                        </div>
                    </div>



                    <button className="btn btn-danger mr-2 mt-3" onClick={this.previousStep}>
                        <i class="fas fa-arrow-left"></i> Go Back
                    </button>
                    <button className="btn btn-success mt-3" type="submit" onClick={this.continue}>
                        Book Free Trial <i class="fas fa-smile"></i>
                    </button>
                </div>
            </div>
        </div>;
    }
}
