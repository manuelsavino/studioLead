import React, { Component } from 'react'
import ClassDetails from './ClassDetails'
import API from '../utils/API';

export default class Results extends Component {
    constructor(props) {
        super(props)
        // this.continue = this.continue.bind(this)
        this.state = {
            results: [],
            loading: true
        }
    }

    componentWillMount = () => {
        API.getClassesByAge(this.props.age).then(results => {
            this.setState({ results: results.data, loading: false })

        })
    }
    continue = (e, nameOfClass, schedule, classTrying, time) => {
        e.preventDefault()
        this.props.nextStep(nameOfClass, schedule, classTrying, time);
    }
    previousStep = e => {
        e.preventDefault()
        this.props.previousStep();
    }

    render() {

        const { cFirstName } = this.props
        if (this.state.loading) {
            return (
                <div className="container">
                    <div className="text-center">
                        <ul id="progressbar">
                            <li> Parent Information</li>
                            <li>Child's Information</li>
                            <li className="active">Choose a Class</li>
                            <li>Pick a date</li>
                            <li>Confirm</li>
                            <li>Done</li>
                        </ul>
                    </div>
                    <div className="card">
                        <div className="card-body text-center">
                            <img className="my-auto" src="./loading.gif" alt="Loading" />
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.results.length) {
            const ClassesToRender = this.state.results.map(Class => { return <ClassDetails key={Class._id} classTrying={Class._id} NameOfClass={Class.nameOfClass} schedule={Class.schedule} time={Class.time} next={this.continue} /> }, this)
            return <div className="container">
                <div className="text-center">
                    <ul id="progressbar">
                        <li> Parent Information</li>
                        <li>Child's Information</li>
                        <li className="active">Choose a Class</li>
                        <li>Pick a date</li>
                        <li>Confirm</li>
                        <li>Done</li>
                    </ul>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h1 className="display-4 sortaBlack">
                            These are the classes available
                        </h1>
                        <p className="text-muted">Click on a class to continue</p>

                        <div className="results">{ClassesToRender}</div>
                        <button className="btn btn-danger mr-2 mt-3" onClick={this.previousStep}>
                            <i class="fas fa-arrow-left"></i> Go Back
                    </button>
                    </div>
                </div>
            </div>;
        } else {
            return (
                <div className="container">
                    <div className="text-center">
                        <ul id="progressbar">
                            <li> Parent Information</li>
                            <li>Child's Information</li>
                            <li className="active">Choose a Class</li>
                            <li>Pick a date</li>
                            <li>Confirm</li>
                            <li>Done</li>
                        </ul>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="display-4">Sorry there are no classes available for {cFirstName}'s age at this time.</h2>
                            <button className="btn btn-danger mr-2" onClick={this.previousStep} >Go Back</button>
                        </div>
                    </div>

                </div>
            )
        }
    }
}
