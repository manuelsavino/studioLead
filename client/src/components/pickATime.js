import React, { Component } from 'react'
import EachDay from './eachDay'
import moment from 'moment'




export default class PickATime extends Component {


    continue = (e, date) => {
        e.preventDefault()
        this.props.nextStep("", "", "", "", date);
    }
    previousStep = e => {
        e.preventDefault()
        this.props.previousStep();
    }



    render() {
        const dates = this.props.schedule.map((day, index) => <EachDay key={index} day={day} id={this.props.id} next={this.continue} />)
        return <div className="container">
            <div className="text-center">
              <ul id="progressbar">
                <li> Parent Information</li>
                <li>Child's Information</li>
                <li>Choose a Class</li>
                <li className="active">Pick a time</li>
                <li>Confirmation</li>
                <li>Submit</li>
              </ul>
            </div>

            <div className="card">
              <div className="card-body">
                <h2 className="display-4">
                  {this.props.nameOfClass} at {moment(this.props.time, "HH:mm").format("h:mm A")}
                </h2>
                <div className="results">{dates}</div>

                <button className="btn btn-primary mr-2 mt-2" onClick={this.previousStep}>
                  Go Back
                </button>
              </div>
            </div>
          </div>;
    }
}
