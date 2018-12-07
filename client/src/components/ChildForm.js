import React, { Component } from 'react'
class ChildForm extends Component {

    continue = e => {
        e.preventDefault()
        const { values } = this.props
        if (values.age && values.cFirstName && values.cLastName) {
            this.props.nextStep();
        }
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
                        Future Dancer's Information
                </h2>
                    <p className="text-muted">Future dancer's as in the child</p>

                    <form className="needs-validation">
                        <div className="form-group">
                            <input required type="text" className="form-control" name="cFirstName" value={values.cFirstName} onChange={handleChange} placeholder="Child's First Name" />
                        </div>
                        <div className="form-group">
                            <input required type="text" className="form-control" name="cLastName" value={values.cLastName} onChange={handleChange} placeholder="Child's Last Name" />
                        </div>

                        <div className="form-group">
                            <select name="age" onChange={handleChange} className="form-control custom-select" value={values.age}>
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
                            <div className="invalid-feedback">
                                Example invalid custom select feedback
                    </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-danger mr-2" onClick={this.previousStep}>
                                <i class="fas fa-arrow-left"></i> Go Back
                    </button>
                            <button className="btn btn-success" type="submit" onClick={this.continue}>
                                Continue <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>;
    }
}

export default ChildForm
