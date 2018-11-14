import React, { Component } from 'react'
import ParentForm from './ParentForm'
import ChildForm from './ChildForm'
import API from "../../utils/API";

export default class LeadForm extends Component {
    state = {
        step: 1,
        pFirstName: '',
        pLastName: '',
        cFirstName: '',
        cLastName: '',
        age: '',
        cellPhone: '',
        emailAddress: ''
    }

    nextStep = () => {
        const { step } = this.state

        this.setState({
            step: step + 1
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
                return <h1>Results</h1>
            default:
                return null;
        }


    }
}
