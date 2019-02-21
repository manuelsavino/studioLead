import React, { Component, Fragment } from "react";
import Navbar from "../components/admin/Navbar";
import API from "../utils/API";
import "./lead.css";
import { connect } from "react-redux";
import moment from "moment";
import {
  Container,
  Table,
  Button,
  Card,
  CardBody,
  CardHeader
} from "reactstrap";
import { EachClass } from "../components/admin/eachClass";
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
      return <EachClass key={eachClass._id} eachClass={eachClass} />;
    });

    return (
      <Fragment>
        <div className="wrapper">
          <Navbar active="classMgmt" />
          <Container className="mt-1">
            <Card className="shadow-sm mt-2">
              <CardHeader
                tag="h4"
                className="text-uppercase bg-purple text-light d-flex justify-content-between"
              >
                <span>
                  Classes <i className="fas fa-chalkboard" />
                </span>
                <Link to={`/admin/addAClass`}>
                  <Button color="info" size="sm">
                    Add A Class
                  </Button>
                </Link>
              </CardHeader>

              <Table hover borderless responsive className="text-center mt-3">
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
            </Card>
          </Container>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(ClassManagment);
