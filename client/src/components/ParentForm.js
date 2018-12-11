import React, { Component } from 'react'
import MaskedInput from 'react-text-mask';

class ParentForm extends Component {
  continue = e => {
    e.preventDefault()
    this.props.nextStep();
  }

  previousStep = e => {
    e.preventDefault()
    this.props.previousStep();
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
          <p className="text-muted">
            Your information as in the parent or gurdian
            </p>

          <div className="form-group">
            <input type="text" name="pFirstName" onChange={handleChange} className="form-control" placeholder="Parent First Name" value={values.pFirstName} />
          </div>

          <div className="form-group">
            <input type="text" name="pLastName" onChange={handleChange} className="form-control" placeholder="Parent Last Name" value={values.pLastName} />
          </div>
          <div className="form-group">
            <MaskedInput className="form-control" placeholder="Parent Cell Phone" name="parentCellphone" onChange={handleChange} value={values.parentCellphone} mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]} />
          </div>

          <div className="form-group">
            <input type="email" name="email" onChange={handleChange} className="form-control" placeholder="Parent Email Address" value={values.email} />
          </div>
          <p className="text-muted">
            Who will be trying our class?
            </p>
          <div className="form-group">
            <input required type="text" className="form-control" name="cFirstName" value={values.cFirstName} onChange={handleChange} placeholder="Child's First Name" />
          </div>
          <div className="form-group">
            <input required type="text" className="form-control" name="cLastName" value={values.cLastName} onChange={handleChange} placeholder="Child's Last Name" />
          </div>
          <div className="form-group">
            <button className="btn btn-danger mr-2" onClick={this.previousStep}>
              <i className="fas fa-arrow-left"></i> Go Back
                    </button>
            <button className="btn btn-success" onClick={this.continue}>
              Continue <i class="fas fa-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </div>;
  }
}


export default ParentForm;
