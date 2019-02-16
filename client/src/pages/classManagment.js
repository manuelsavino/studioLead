import React, { Component, Fragment } from "react";
import Navbar from "../components/admin/Navbar";
import API from "../utils/API";
import "./lead.css";
import { connect } from "react-redux";
import moment from "moment";
import { Container, Table, Button } from "reactstrap";
import { Link } from "react-router-dom";

export class ClassManagment extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      loading: true
    };
  }

  componentWillMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    } else {
      API.getClasses().then(classes => {
        this.setState({ results: classes.data, loading: false });
      });
    }
  }

  classStatusToString(status) {
    if (status) {
      return "Active";
    } else {
      return "Incative";
    }
  }

  render() {
    const classes = this.state.results.map(eachClass => {
      return (
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
          <td>{this.classStatusToString(eachClass.status)}</td>
        </tr>
      );
    });

    return (
      <Fragment>
        <Navbar />
        <Container className="mt-3">
          <Link to={`/admin/addAClass`}>
            <Button>Add A Class</Button>
          </Link>
          <Table dark hover className="text-center">
            {console.log(this.state.results)}
            <thead>
              <tr>
                <th>Class Name</th>
                <th>Schedule</th>
                <th>Time</th>
                <th>Age Group</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{classes}</tbody>
          </Table>
        </Container>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(ClassManagment);
