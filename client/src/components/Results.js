import React, { Component } from 'react'
import ClassDetails from './ClassDetails'
import API from '../utils/API';





export default class Results extends Component {
    constructor(props) {
        super(props)
        // this.continue = this.continue.bind(this)

        this.state = {
            results: []
        }

        API.getClassesByAge(this.props.age).then(results => {
            this.setState({ results: results.data })
        })
    }

    continue = (e, nameOfClass, schedule, id, time) => {
        e.preventDefault()
        this.props.nextStep(nameOfClass, schedule, id, time);
    }
    previousStep = e => {
        e.preventDefault()
        this.props.previousStep();
    }

    render() {

        const { cFirstName } = this.props

        if (this.state.results.length) {
            const ClassesToRender = this.state.results.map(Class => { return <ClassDetails key={Class._id} id={Class._id} NameOfClass={Class.nameOfClass} schedule={Class.schedule} time={Class.time} next={this.continue} /> }, this)
            return (
                <div className="container">
                    <h2 className="display-4">This are the classes available for {cFirstName}</h2>
                    <div className="results">
                        {ClassesToRender}
                    </div>
                    <button className="btn btn-primary mr-2" onClick={this.previousStep} >Go Back</button>

                </div>
            )
        } else {
            return (
                <div className="container">
                    <h2 className="display-4">Sorry there are no classes available for {cFirstName}'s age at this time.</h2>

                    <button className="btn btn-primary mr-2" onClick={this.previousStep} >Go Back</button>

                </div>
            )
        }
    }
}
