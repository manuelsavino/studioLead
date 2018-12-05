import React, {Component} from 'react'
import moment from 'moment'

export default class Confirmation extends Component {
    continue = e => {
        e.preventDefault()
        this.props.nextStep();
        
    }

    previousStep = e => {
        e.preventDefault()
        this.props.previousStep();
    }
    
    render(){
    return <div className="container">
        <div className="text-center">
          <ul id="progressbar">
            <li> Parent Information</li>
            <li>Child's Information</li>
            <li>Choose a Class</li>
            <li>Pick a time</li>
            <li className="active">Confirmation</li>
            <li>Submit</li>
          </ul>
        </div>

        <div className="card">
          <div className="card-body">
            <h2 className="display-4">Confirm</h2>
            <h2>Child's Name: {this.props.info.cFirstName + this.props.info.cLastName}</h2>
            <h2>Parent's Name: {this.props.info.pFirstName + this.props.info.pLastName}</h2>
            <h2>Cell Phone: {this.props.info.cellPhone}</h2>
            <h2>Email: {this.props.info.emailAddress}</h2>

            <h1>Class Information</h1>
            <h2>Class: {this.props.info.nameOfClass}</h2>
            <h2>
              Trial Date:{" "}
                    {moment(this.props.info.date, "MM/DD/YYYY").format("dddd, MMMM Do YYYY")}{" "}
            </h2>
                <h2>Time: {moment(this.props.info.time, "HH:mm").format("h:mm A")}</h2>

                <button className="btn btn-primary mr-2" onClick={this.previousStep}>
                    Go Back
                    </button>
                <button className="btn btn-primary" type="submit" onClick={this.continue}>
                    Continue
                    </button>
          </div>
        </div>
      </div>;
    }
}
