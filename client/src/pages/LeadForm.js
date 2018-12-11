import React, { Component } from 'react'
import ParentForm from '../components/ParentForm'
import ChildForm from '../components/ChildForm'
import Results from '../components/Results'
import PickATime from '../components/pickATime'
import Confirmation from '../components/Confirmation'
import API from '../utils/API';
import './lead.css';

export default class LeadForm extends Component {
    state = {
        step: 1,
        pFirstName: 'Manuel',
        pLastName: 'Savino',
        cFirstName: 'Elliana',
        cLastName: 'Lopera',
        age: '',
        parentCellphone: '(786)434-5555',
        email: 'manuelsavino@gmai.com',
        classTrying: '',
        nameOfClass: '',
        schedule: '',
        date: '',
        time: ''

    }

    getClasses = () => {
        API.getClassesByAge(this.props.age).then(results => {
            this.setState({ results: results.data, loading: false })

        })
    }

    nextStep = (nameOfClass, schedule, classTrying, time, date) => {
        const { step } = this.state
        nameOfClass = nameOfClass || this.state.nameOfClass
        schedule = schedule || this.state.schedule
        classTrying = classTrying || this.state.classTrying
        time = time || this.state.time
        date = date || this.state.date


        this.setState({
            step: step + 1,
            nameOfClass,
            schedule,
            classTrying,
            time,
            date
        })
    }

    previousStep = () => {
        const { step } = this.state

        this.setState({
            step: step - 1
        })
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = event => {
        const { pFirstName, pLastName, cFirstName, cLastName, email, parentCellphone, age, date, classTrying } = this.state
        const data = { pFirstName, pLastName, cFirstName, cLastName, email, parentCellphone, age, trialDate: date, classTrying }
        API.createLead(data)

    }

    render() {
        const { step } = this.state;
        const { pFirstName, pLastName, cFirstName, cLastName, parentCellphone, age, email, classTrying } = this.state;
        const values = { pFirstName, pLastName, cFirstName, cLastName, parentCellphone, age, email, classTrying };

        switch (step) {
            case 1:
                return <ChildForm
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    handleChange={this.handleChange}
                    values={values}
                />
            case 2:
                return (
                    <Results
                        cFirstName={this.state.cFirstName}
                        nextStep={this.nextStep}
                        age={this.state.age}
                        previousStep={this.previousStep} />
                )
            case 3:
                return (
                    <PickATime
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        schedule={this.state.schedule}
                        nameOfClass={this.state.nameOfClass}
                        id={this.state.id}
                        time={this.state.time}
                    />
                )

            case 4:
                return <ParentForm
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    handleChange={this.handleChange}
                    values={values}
                />

            case 5:
                return (
                    <Confirmation
                        info={this.state}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        handleSubmit={this.handleSubmit}
                    />

                )
            case 6:
                return (
                    <h1>Done</h1>

                )


            default:
                return null;
        }


    }
}
