import React, { Component } from "react";
import moment from "moment";
import API from "../../utils/API";

export default class DisplayLead extends Component {
  constructor() {
    super();
    this.state = {
      signedUp: "",
      triedClass: ""
    };
  }

  handleChange = event => {
    const { name } = event.target;

    this.setState({
      [name]: event.target.checked
    });
    let data = {
      [name]: event.target.checked
    };
    API.updateLeadStatus(data, this.props.child._id);
  };

  componentDidMount() {
    const { signedUp, triedClass } = this.props.child;
    this.setState({ signedUp, triedClass });
  }

  render() {
    const {
      cFirstName,
      cLastName,
      age,
      trialDate,
      signedUp,
      triedClass
    } = this.props.child;
    const { nameOfClass, time } = this.props.child.classTrying;
    return (
      <div className="border w-50 ml-1 mr-1">
        <table className="table">
          <tbody>
            <tr>
              <td>Name: </td>
              <td>{`${cFirstName} ${cLastName}`}</td>
            </tr>
            <tr>
              <td>Age:</td>
              <td>{age}</td>
            </tr>
            <tr>
              <td>Class Trying: </td>
              <td>{`${nameOfClass} at ${moment(time, "HH:mm").format(
                "h:mm A"
              )}`}</td>
            </tr>
            <tr>
              <td>Trial Date:</td>
              <td>{trialDate}</td>
            </tr>
            <tr>
              <td>Signed Up:</td>
              <td>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={this.state.signedUp}
                    onChange={this.handleChange}
                    name="signedUp"
                  />
                  <span className="slider round" />
                </label>
              </td>
            </tr>
            <tr>
              <td>Tried Class:</td>
              <td>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={this.state.triedClass}
                    onChange={this.handleChange}
                    name="triedClass"
                  />
                  <span className="slider round" />
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
