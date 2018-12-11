import React, { Component } from 'react'
import ClassDetails from './ClassDetails'
import API from '../utils/API';

class ChildForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
            loading: true,
            age: this.props.values.age
        }
        this.loadClasses();
    }

    continue = (e, nameOfClass, schedule, classTrying, time) => {
        e.preventDefault()
        this.props.nextStep(nameOfClass, schedule, classTrying, time);

    }

    previousStep = e => {
        e.preventDefault()
        this.props.previousStep();
    }

    handleChange = event => {
        const {name, value} = event.target
        this.setState({ [name]: value })
        this.props.handleChange(event)
    }

    loadClasses = () => {
        API.getClasses().then(results => {
        this.setState({ results: results.data, loading: false })
    })
    }


    render() {

        const { values } = this.props;
        return <div className="container">
            <div className="text-center">
              <ul id="progressbar">
                <li> Parent Info</li>
                <li className="active">Child's Info</li>
                <li>Choose a Class</li>
                <li>Pick a date</li>
                <li>Confirm</li>
                <li>Done</li>
              </ul>
            </div>
            <div className="card">
              <div className="card-body">
                <h2 className="display-4 sortaBlack">
                  Future Dancer's Age
                </h2>
                <p className="text-muted">How old is your child</p>
                <form>
                  <div className="form-group">
                    <select name="age" onChange={this.handleChange} className="form-control custom-select" value={values.age}>
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
                  {/* <div className="form-group">
                    <button className="btn btn-success" type="submit" onClick={this.continue}>
                      Continue <i className="fas fa-arrow-right" />
                    </button>
                  </div> */}
                </form>
                {!this.props.values.age 
                ? <span /> 
                :<div className="results">
                    {console.log(this.state.age)}
                    {console.log("before Filter", this.state.results)}
                    {this.state.results
                      .filter(Class => {
                        return this.state.age >= Class.min && this.state.age <= Class.max;
                      }, this)
                      .map(EachClass => {
                        return <ClassDetails key={EachClass._id} classTrying={EachClass._id} NameOfClass={EachClass.nameOfClass} schedule={EachClass.schedule} time={EachClass.time} next={this.continue} />;
                      }, this)}
                  </div>}
              </div>
            </div>
          </div>;
    }
}

export default ChildForm
