import React, { Component } from "react";
import ParentForm from "../components/leadForm/ParentForm";
import ChildForm from "../components/leadForm/ChildForm";
import PickATime from "../components/leadForm/pickATime";
import Confirmation from "../components/leadForm/Confirmation";
import API from "../utils/API";
import "./lead.css";

export default class LeadForm extends Component {
  state = {
    step: 1,
    pFirstName: "Manuel",
    pLastName: "Savino",
    cFirstName: "Elliana",
    cLastName: "Lopera",
    age: "",
    parentCellphone: "(786)434-5555",
    email: "manuelsavino@gmai.com",
    classTrying: "",
    nameOfClass: "",
    schedule: "",
    date: "",
    time: ""
  };

  nextStep = (nameOfClass, schedule, classTrying, time, date) => {
    const { step } = this.state;
    nameOfClass = nameOfClass || this.state.nameOfClass;
    schedule = schedule || this.state.schedule;
    classTrying = classTrying || this.state.classTrying;
    time = time || this.state.time;
    date = date || this.state.date;

    this.setState({
      step: step + 1,
      nameOfClass,
      schedule,
      classTrying,
      time,
      date
    });
  };

  previousStep = () => {
    const { step } = this.state;

    this.setState({
      step: step - 1
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    let {
      pFirstName,
      pLastName,
      cFirstName,
      cLastName,
      email,
      parentCellphone,
      age,
      date,
      classTrying
    } = this.state;
    let re = /\D/g;
    parentCellphone = "+1" + parentCellphone.replace(re, "");
    const data = {
      pFirstName,
      pLastName,
      cFirstName,
      cLastName,
      email,
      parentCellphone,
      age,
      trialDate: date,
      classTrying
    };
    API.createLead(data);
  };

  render() {
    const { step } = this.state;
    const {
      pFirstName,
      pLastName,
      cFirstName,
      cLastName,
      parentCellphone,
      age,
      email,
      classTrying
    } = this.state;
    const values = {
      pFirstName,
      pLastName,
      cFirstName,
      cLastName,
      parentCellphone,
      age,
      email,
      classTrying
    };

    switch (step) {
      case 1:
        return (
          <ChildForm
            nextStep={this.nextStep}
            previousStep={this.previousStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <PickATime
            nextStep={this.nextStep}
            previousStep={this.previousStep}
            schedule={this.state.schedule}
            nameOfClass={this.state.nameOfClass}
            id={this.state.id}
            time={this.state.time}
          />
        );

      case 3:
        return (
          <ParentForm
            nextStep={this.nextStep}
            previousStep={this.previousStep}
            handleChange={this.handleChange}
            values={values}
          />
        );

      case 4:
        return (
          <Confirmation
            info={this.state}
            nextStep={this.nextStep}
            previousStep={this.previousStep}
            handleSubmit={this.handleSubmit}
          />
        );
      case 5:
        return <h1>Done</h1>;
      default:
        return null;
    }
  }
}
