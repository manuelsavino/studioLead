import React, { Component } from "react";
import moment from "moment";
import API from "../../utils/API";
import { Table } from "reactstrap";
import classnames from "classnames";

export class EachClass extends Component {
  constructor() {
    super();
    this.state = {
      status: ""
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
    // console.log(data);
    API.updateClassStatus(data, this.props.eachClass._id);
  };

  componentDidMount() {
    const { status } = this.props.eachClass;
    this.setState({ status, status });
  }

  render() {
    const { eachClass } = this.props;
    return (
      //   <div>{console.log("props", this.props.eachClass)}</div>
      <tr className="">
        <td>{eachClass.nameOfClass}</td>
        <td>
          {eachClass.schedule.map(day =>
            moment()
              .day(day)
              .format("ddd ")
          )}
        </td>
        <td>{moment(eachClass.time, "HH:mm").format("h:mm A")}</td>
        <td>{`${eachClass.min} - ${eachClass.max}`}</td>
        <td>
          <label className="switch">
            <input
              type="checkbox"
              checked={this.state.status}
              onChange={this.handleChange}
              name="status"
            />
            <span className="slider round" />
          </label>
        </td>
        {/* <td>{this.classStatusToString(eachClass.status)}</td> */}
      </tr>
    );
  }
}
