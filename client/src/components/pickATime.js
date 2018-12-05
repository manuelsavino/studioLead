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
        return (
            <div className="container">
                <h2 className="display-4">Pick a date to come try the {this.props.nameOfClass} class at {moment(this.props.time, 'HH:mm').format('h:mm A')}</h2>
                <div className="results">
                    {dates}
                </div>

                <button className="btn btn-primary mr-2" onClick={this.previousStep} >Go Back</button>
            </div>
        )
    }
}
