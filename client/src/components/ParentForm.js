import React, { Component } from 'react'
import MaskedInput from 'react-text-mask';

class ParentForm extends Component {
  continue = e => {
    e.preventDefault()
    this.props.nextStep();
  }

  render() {

    const { values, handleChange } = this.props;

    return <div className="container">
      <div className="text-center">
        <ul id="progressbar">
          <li className="active"> Parent Info</li>
          <li>Child's Info</li>
          <li>Choose a Class</li>
          <li>Pick a date</li>
          <li>Confirm</li>
          <li>Done</li>

        </ul>
      </div>
      <div className="card">
        <div className="card-body">
          <h2 className="display-4 sortaBlack">Your Information</h2>
          <p className="text-muted">Your information as in the parent or gurdian</p>

          <div className="form-group">
            <input type="text" name="pFirstName" onChange={handleChange} className="form-control" placeholder="Parent First Name" value={values.pFirstName} />
          </div>

          <div className="form-group">
            <input type="text" name="pLastName" onChange={handleChange} className="form-control" placeholder="Parent Last Name" value={values.pLastName} />
          </div>
          <div className="form-group">
            <MaskedInput className="form-control" placeholder="Parent Cell Phone" name="cellPhone" onChange={handleChange} value={values.cellPhone} mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]} />
          </div>

          <div className="form-group">
            <input type="email" name="emailAddress" onChange={handleChange} className="form-control" placeholder="Parent Email Address" value={values.emailAddress} />
          </div>
          <div className="form-group">
            <button className="btn btn-success" onClick={this.continue}>
              Continue <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>;
  }
}


export default ParentForm;
