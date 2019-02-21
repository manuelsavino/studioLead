import React, { Component } from "react";
import ClassDetails from "./ClassDetails";
import { Spinner } from "reactstrap";
import API from "../../utils/API";

class ChildForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: true,
      age: this.props.values.age,
      days: "",
      needsValidation: false
    };
    this.loadClasses();
  }

  continue = (e, nameOfClass, schedule, classTrying, time) => {
    e.preventDefault();
    this.props.nextStep(nameOfClass, schedule, classTrying, time);
  };

  showValidation = () => {
    this.setState({ needsValidation: true });
  };

  previousStep = e => {
    e.preventDefault();
    this.props.previousStep();
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value, needsValidation: false });
    this.props.handleChange(event);
  };

  loadClasses = () => {
    API.getActiveClasses().then(results => {
      this.setState({ results: results.data, loading: false });
    });
  };

  render() {
    let filteredClasses;
    if (this.state.days) {
      console.log(this.state.results);
      filteredClasses = this.state.results
        .filter(Class => {
          return this.state.age >= Class.min && this.state.age <= Class.max;
        }, this)
        .filter(Class => {
          return Class.schedule.find(day => {
            return day === parseInt(this.state.days); //since day value save on state is a string, I used a == instead of a ===
          });
        }, this);
    } else {
      // console.log("day was not choosen ^");
      filteredClasses = this.state.results.filter(Class => {
        return this.state.age >= Class.min && this.state.age <= Class.max;
      }, this);
    }

    const { values } = this.props;
    return (
      <div className="container p-0">
        <div className="text-center">
          <img className="my-auto" src="./logo.png" alt="logo" />
          <ul id="progressbar">
            <li className="active"> Choose a class</li>
            <li>Pick a date</li>
            <li>Information</li>
            <li>Confirm</li>
            <li>Done</li>
          </ul>
        </div>
        <div className="card">
          <div className="card-body">
            <h2 className="display-3 sortaBlack ">How old is your child?</h2>
            <p className="text-muted">
              Select your child's age and to show only classes for that age
            </p>
            <form>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <select
                      name="age"
                      onChange={this.handleChange}
                      className={
                        this.state.needsValidation
                          ? "form-control custom-select is-invalid"
                          : "form-control custom-select"
                      }
                      value={values.age}
                    >
                      <option value="">Child's Age</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                    </select>
                  </div>
                </div>
                {/* <div className="col">
                <div className="form-group">
                  <select name="age" className="form-control custom-select" disabled={!this.state.age}>
                    <option value="">Style</option>
                    <option value="3">Acrop</option>
                    <option value="4">Ballet</option>
                    <option value="5">Contemporary</option>
                    <option value="6">Flamenco</option>
                    <option value="7">Hip Hop</option>
                    <option value="8">Jazz</option>
                    <option value="9">Jazz Funk</option>
                    <option value="10">Lyrical</option>
                    <option value="11">Stretching</option>
                    <option value="12">Tap</option>
                    <option value="13">Technique</option>
                  </select>
                </div>
              </div> */}
                <div className="col">
                  <div className="form-group">
                    <select
                      name="days"
                      disabled={!this.state.age}
                      onChange={this.handleChange}
                      className={
                        !this.state.age
                          ? "form-control custom-select disabled"
                          : "form-control custom-select"
                      }
                      value={this.state.days}
                    >
                      <option value="">Days</option>
                      <option value="1">Monday</option>
                      <option value="2">Tuesday</option>
                      <option value="3">Wednesday</option>
                      <option value="4">Thursday</option>
                      <option value="5">Friday</option>
                      <option value="6">Saturday</option>
                      <option value="7">Sunday</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* <div className="form-group">
                    <button className="btn btn-success" type="submit" onClick={this.continue}>
                      Continue <i className="fas fa-arrow-right" />
                    </button>
                  </div> */}
            </form>

            {!this.props.values.age ? (
              <div className="results">
                {this.state.results.map(EachClass =>
                  // age has not been selected
                  {
                    return (
                      <ClassDetails
                        key={EachClass._id}
                        cssClass={"eachClassBefore"}
                        age={`${EachClass.min} to  ${EachClass.max} years old`}
                        classTrying={EachClass._id}
                        NameOfClass={EachClass.nameOfClass}
                        schedule={EachClass.schedule}
                        time={EachClass.time}
                        next={this.showValidation} //Makes it unclickable since they have note selected an age
                      />
                    );
                  }, this)}
              </div>
            ) : filteredClasses.length > 0 ? (
              <div className="results">
                {console.log("day was not set")}
                {/* age was chosen and there are matching results */}
                {filteredClasses.map(EachClass => {
                  return (
                    <ClassDetails
                      key={EachClass._id}
                      cssClass={"eachClass"}
                      age={`${EachClass.min} to  ${EachClass.max} years old`}
                      classTrying={EachClass._id}
                      NameOfClass={EachClass.nameOfClass}
                      schedule={EachClass.schedule}
                      time={EachClass.time}
                      next={this.continue}
                    />
                  );
                }, this)}
              </div>
            ) : //if filteres classes array is empty, check if its still loading
            this.state.loading ? (
              //if its still loading show image for loading
              <div className="card-body text-center">
                <img className="my-auto" src="./loading.gif" alt="Loading" />
              </div>
            ) : (
              //if its not, it means no classes matched the age
              <div className="text-center">
                <h1 className="text-danger">
                  <i className="fas fa-frown" />
                </h1>
                <h1 className="display-5 sortaBlack">
                  Sorry no classes available for this age and or days
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ChildForm;
