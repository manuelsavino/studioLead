import React, { Component } from "react";
import EachDay from "./eachDay";
import moment from "moment";

export default class PickATime extends Component {
  continue = (e, date) => {
    e.preventDefault();
    this.props.nextStep("", "", "", "", date);
  };
  previousStep = e => {
    e.preventDefault();
    this.props.previousStep();
  };

  render() {
    const dates = this.props.schedule.map((day, index) => (
      <EachDay
        key={index}
        day={day}
        classTrying={this.props.classTrying}
        next={this.continue}
        dayCount={this.props.schedule.length}
      />
    ));
    return (
      <div className="container">
        <div className="text-center">
          <img className="my-auto" src="./logo.png" alt="logo" />

          <ul id="progressbar">
            <li> Choose a class</li>
            <li className="active">Pick a date</li>
            <li>Information</li>
            <li>Confirm</li>
            <li>Done</li>
          </ul>
        </div>

        <div className="card">
          <div className="card-body">
            <h2 className="display-4 sortaBlack">
              {this.props.nameOfClass} at{" "}
              {moment(this.props.time, "HH:mm").format("h:mm A")}
            </h2>
            <p className="text-muted">
              Click on date you would like to try the class to continue
            </p>

            <div className="results">{dates}</div>

            <button
              className="btn btn-danger mr-2 mt-2"
              onClick={this.previousStep}
            >
              <i className="fas fa-arrow-left" /> Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
}
