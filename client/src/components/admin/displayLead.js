import React, { Component } from "react";
import moment from "moment";
import API from "../../utils/API";
import { Table } from "reactstrap";
import classnames from "classnames";
import "./admin.css";

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
      <div
        className={classnames("w-100", {
          "bg-warning": this.state.triedClass,
          "bg-light": !this.state.triedClass,
          "bg-success": this.state.signedUp
        })}
      >
        <Table>
          <tbody
            className={classnames("", {
              "text-white": this.state.triedClass
            })}
          >
            <tr>
              <td className="border-top-0" colspan="2">
                Name:{" "}
              </td>
              <td
                className="border-top-0"
                colspan="2"
              >{`${cFirstName} ${cLastName}`}</td>
            </tr>
            <tr>
              <td colspan="2">Age:</td>
              <td colspan="2">{age}</td>
            </tr>
            <tr>
              <td colspan="2">Class Trying: </td>
              <td colspan="2">{`${nameOfClass} at ${moment(
                time,
                "HH:mm"
              ).format("h:mm A")} on ${trialDate}`}</td>
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
          </tbody>
        </Table>
      </div>
    );
  }
}
