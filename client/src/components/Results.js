import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import ClassDetails from './ClassDetails'
import Button from '@material-ui/core/Button';

const classes = [
    { NameOfClass: "Ballet", Schedule: "Monday, Wednesday", ageGroup: "3-4", time: "5:00PM", id: "1" },
    { NameOfClass: "Tap", Schedule: "Tuesday, Thursday", ageGroup: "3-4", time: "6:00PM", id: "2" },
    { NameOfClass: "Hip Hop", Schedule: "Wednesday", ageGroup: "3-4", time: "4:30PM", id: "3" }]



export default class Results extends Component {
    continue = e => {
        e.preventDefault()
        this.props.nextStep();
    }

    previousStep = e => {
        e.preventDefault()
        this.props.previousStep();
    }

    render() {
        const ClassesToRender = classes.map(function (Class) { return <ClassDetails key={Class.id} NameOfClass={Class.NameOfClass} ageGroup={Class.ageGroup} schedule={Class.Schedule} time={Class.time} /> })


        const { cFirstName } = this.props
        return (
            <div className="container">
                <Typography component="h2" variant="h2" gutterBottom>
                    This are the classes available for {cFirstName}
                </Typography>
                <div className="results">
                    {ClassesToRender}
                </div>
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.previousStep}
                    margin="normal">
                    Go Back
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.continue}
                    margin="normal">
                    Continue
                </Button>

            </div>
        )
    }
}
