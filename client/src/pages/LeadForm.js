import React, { Component } from 'react'
import ParentForm from '../components/ParentForm'
import ChildForm from '../components/ChildForm'
import Results from '../components/Results'
import PickATime from '../components/pickATime'
import Confirmation from '../components/Confirmation'
import API from '../utils/API';

export default class LeadForm extends Component {
    state = {
        step: 1,
        pFirstName: 'Manuel',
        pLastName: 'Savino',
        cFirstName: 'Elliana',
        cLastName: 'Lopera',
        age: '5',
        cellPhone: '',
        emailAddress: 'manuelsavino@gmail.com   ',
        id: 'none',
        nameOfClass: '',
        schedule: '',
        date: '',
        time: ''

    }

    nextStep = (nameOfClass, schedule, id, time, date) => {
        const { step } = this.state
        nameOfClass = nameOfClass || this.state.nameOfClass
        schedule = schedule || this.state.schedule
        id = id || this.state.id
        time = time || this.state.time
        date = date || this.state.date


        this.setState({
            step: step + 1,
            nameOfClass,
            schedule,
            id,
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



    render() {

        const { step } = this.state;
        const { pFirstName, pLastName, cFirstName, cLastName, cellPhone, age, emailAddress } = this.state
        const values = { pFirstName, pLastName, cFirstName, cLastName, cellPhone, age, emailAddress }

        switch (step) {
            case 1:
                return (
                    <ParentForm
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}

                    />
                )
            case 2:
                return <ChildForm
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    handleChange={this.handleChange}
                    values={values}
                />
            case 3:
                return (
                    <Results
                        cFirstName={this.state.cFirstName}
                        nextStep={this.nextStep}
                        age={this.state.age}
                        previousStep={this.previousStep} />
                )

            case 4:
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

            case 5:
                return (
                    <Confirmation
                        nameOfClass={this.state.nameOfClass}
                        schedule={this.state.schedule}
                        ageGroup={this.state.ageGroup}
                        cFirstName={this.state.cFirstName}
                        cellPhone={this.state.cellPhone}
                        date={this.state.date}
                        time={this.state.time} />

                )

            default:
                return null;
        }


    }
}
